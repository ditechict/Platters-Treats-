DROP POLICY IF EXISTS "Quote settings readable" ON public.quote_settings;
CREATE POLICY "Active quote settings readable" ON public.quote_settings FOR SELECT TO anon, authenticated USING (id = 1);