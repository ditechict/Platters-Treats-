-- Publication flags so "public" reads have a real predicate
ALTER TABLE public.menu_categories ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

-- menu_items: only available items are readable by visitors
DROP POLICY IF EXISTS "Menu items are public" ON public.menu_items;
CREATE POLICY "Available menu items are readable"
ON public.menu_items FOR SELECT
TO anon, authenticated
USING (is_available = true);

-- menu_categories
DROP POLICY IF EXISTS "Menu categories are public" ON public.menu_categories;
CREATE POLICY "Published menu categories are readable"
ON public.menu_categories FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- gallery_images
DROP POLICY IF EXISTS "Gallery is public" ON public.gallery_images;
CREATE POLICY "Published gallery images are readable"
ON public.gallery_images FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- enquiries: validated public submissions only
DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Validated enquiry submissions"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND btrim(name) <> '' AND length(name) <= 120
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 200
  AND btrim(message) <> '' AND length(message) <= 4000
  AND (phone IS NULL OR length(phone) <= 40)
  AND (event_type IS NULL OR length(event_type) <= 80)
  AND (guest_count IS NULL OR (guest_count > 0 AND guest_count <= 100000))
  AND (event_date IS NULL OR event_date >= current_date - 1)
);

-- event_bookings: validated public submissions, cannot be filed under another account
DROP POLICY IF EXISTS "Anyone can request a booking" ON public.event_bookings;
CREATE POLICY "Validated booking requests"
ON public.event_bookings FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND (user_id IS NULL OR user_id = auth.uid())
  AND btrim(name) <> '' AND length(name) <= 120
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 200
  AND btrim(event_type) <> '' AND length(event_type) <= 80
  AND (phone IS NULL OR length(phone) <= 40)
  AND (package_name IS NULL OR length(package_name) <= 120)
  AND (notes IS NULL OR length(notes) <= 4000)
  AND (guest_count IS NULL OR (guest_count > 0 AND guest_count <= 100000))
  AND (event_date IS NULL OR event_date >= current_date - 1)
  AND deposit_amount IS NULL
);

-- storage: stop blanket downloads of the private site-images bucket
DROP POLICY IF EXISTS "Site images readable" ON storage.objects;
CREATE POLICY "Site images readable by owner or admin"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'site-images'
  AND (owner_id = (select auth.uid()::text) OR private.has_role(auth.uid(), 'admin'::app_role))
);