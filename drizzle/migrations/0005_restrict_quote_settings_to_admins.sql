DROP POLICY "Active quote settings readable" ON public.quote_settings;
CREATE POLICY "Admins can view quote settings" ON public.quote_settings FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.quote_settings FROM anon;
GRANT SELECT ON public.quote_settings TO authenticated;