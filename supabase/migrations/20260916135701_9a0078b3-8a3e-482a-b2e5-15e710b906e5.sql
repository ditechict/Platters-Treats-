
-- Remove direct customer insert paths (prices/payment status were client-controlled)
DROP POLICY IF EXISTS "Customers create own orders" ON public.orders;
DROP POLICY IF EXISTS "Customers create own order items" ON public.order_items;

REVOKE INSERT, UPDATE, DELETE ON public.orders FROM authenticated, anon;
REVOKE INSERT, UPDATE, DELETE ON public.order_items FROM authenticated, anon;

-- Server-side order placement: totals computed from menu_items, payment status always 'unpaid'
CREATE OR REPLACE FUNCTION public.place_order(
  _items jsonb,
  _customer_name text,
  _customer_email text,
  _customer_phone text DEFAULT NULL,
  _event_date date DEFAULT NULL,
  _delivery_notes text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _order_id uuid;
  _total numeric := 0;
  _rec record;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF jsonb_typeof(_items) <> 'array' OR jsonb_array_length(_items) = 0 THEN
    RAISE EXCEPTION 'No items supplied';
  END IF;

  IF jsonb_array_length(_items) > 100 THEN
    RAISE EXCEPTION 'Too many items';
  END IF;

  IF coalesce(btrim(_customer_name), '') = '' OR length(_customer_name) > 120 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;

  IF _customer_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(_customer_email) > 200 THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;

  IF _customer_phone IS NOT NULL AND length(_customer_phone) > 40 THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;

  IF _delivery_notes IS NOT NULL AND length(_delivery_notes) > 2000 THEN
    RAISE EXCEPTION 'Notes too long';
  END IF;

  INSERT INTO public.orders (
    user_id, customer_name, customer_email, customer_phone,
    event_date, delivery_notes, total_amount, status, payment_status
  )
  VALUES (
    _uid, btrim(_customer_name), lower(btrim(_customer_email)), nullif(btrim(_customer_phone), ''),
    _event_date, nullif(btrim(_delivery_notes), ''), 0, 'pending', 'unpaid'
  )
  RETURNING id INTO _order_id;

  FOR _rec IN
    SELECT (e->>'menu_item_id')::uuid AS menu_item_id,
           (e->>'quantity')::int AS quantity
    FROM jsonb_array_elements(_items) AS e
  LOOP
    IF _rec.menu_item_id IS NULL OR _rec.quantity IS NULL OR _rec.quantity < 1 OR _rec.quantity > 500 THEN
      RAISE EXCEPTION 'Invalid item entry';
    END IF;

    INSERT INTO public.order_items (order_id, menu_item_id, item_name, unit_price, quantity)
    SELECT _order_id, mi.id, mi.name, mi.price, _rec.quantity
    FROM public.menu_items mi
    WHERE mi.id = _rec.menu_item_id AND mi.is_available = true;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Item unavailable';
    END IF;
  END LOOP;

  SELECT coalesce(sum(unit_price * quantity), 0) INTO _total
  FROM public.order_items WHERE order_id = _order_id;

  UPDATE public.orders SET total_amount = _total WHERE id = _order_id;

  RETURN _order_id;
END;
$$;

REVOKE ALL ON FUNCTION public.place_order(jsonb, text, text, text, date, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.place_order(jsonb, text, text, text, date, text) TO authenticated;
