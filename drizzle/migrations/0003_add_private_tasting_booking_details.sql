ALTER TABLE public.event_bookings ADD COLUMN has_tasting_requested boolean NOT NULL DEFAULT false;
ALTER TABLE public.event_bookings ADD COLUMN tasting_notes text;
CREATE OR REPLACE FUNCTION public.validate_tasting_booking_notes()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.tasting_notes IS NOT NULL AND length(NEW.tasting_notes) > 2000 THEN
    RAISE EXCEPTION 'Tasting notes too long';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER validate_tasting_booking_notes BEFORE INSERT OR UPDATE ON public.event_bookings FOR EACH ROW EXECUTE FUNCTION public.validate_tasting_booking_notes();