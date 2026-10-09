CREATE TABLE public.quote_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  event_styles jsonb NOT NULL DEFAULT '[]'::jsonb,
  service_levels jsonb NOT NULL DEFAULT '[]'::jsonb,
  min_spend numeric NOT NULL DEFAULT 250 CHECK (min_spend >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.quote_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.quote_settings TO authenticated;
GRANT ALL ON public.quote_settings TO service_role;
ALTER TABLE public.quote_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quote settings readable" ON public.quote_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert quote settings" ON public.quote_settings FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update quote settings" ON public.quote_settings FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER quote_settings_updated_at BEFORE UPDATE ON public.quote_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.quote_settings (id, event_styles, service_levels, min_spend) VALUES (1,
'[{"id":"canape-reception","label":"Canapé Reception","perPerson":18,"description":"Elegant finger food for standing receptions"},{"id":"grazing-platters","label":"Grazing Platters","perPerson":14,"description":"Abundant shared platters and boards"},{"id":"afternoon-tea","label":"Afternoon Tea","perPerson":22,"description":"Tiered stands, scones and patisserie"},{"id":"full-banquet","label":"Full Banquet","perPerson":32,"description":"Multi-course seated dining experience"}]',
'[{"id":"delivery-only","label":"Delivery Only","multiplier":1,"description":"Beautifully presented, delivered to your door"},{"id":"setup-styling","label":"Delivery & Styling","multiplier":1.15,"description":"We deliver and style the display for you"},{"id":"staffed-service","label":"Fully Staffed","multiplier":1.35,"description":"Professional staff serve your guests throughout"}]',
250);