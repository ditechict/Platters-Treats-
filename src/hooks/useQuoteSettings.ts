import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type EventStyle = { id: string; label: string; perPerson: number; description: string };
export type ServiceLevel = { id: string; label: string; multiplier: number; description: string };
export type QuoteSettings = { eventStyles: EventStyle[]; serviceLevels: ServiceLevel[]; minSpend: number };

export const DEFAULT_QUOTE_SETTINGS: QuoteSettings = {
  eventStyles: [
    { id: 'canape-reception', label: 'Canapé Reception', perPerson: 18, description: 'Elegant finger food for standing receptions' },
    { id: 'grazing-platters', label: 'Grazing Platters', perPerson: 14, description: 'Abundant shared platters and boards' },
    { id: 'afternoon-tea', label: 'Afternoon Tea', perPerson: 22, description: 'Tiered stands, scones and patisserie' },
    { id: 'full-banquet', label: 'Full Banquet', perPerson: 32, description: 'Multi-course seated dining experience' },
  ],
  serviceLevels: [
    { id: 'delivery-only', label: 'Delivery Only', multiplier: 1, description: 'Beautifully presented, delivered to your door' },
    { id: 'setup-styling', label: 'Delivery & Styling', multiplier: 1.15, description: 'We deliver and style the display for you' },
    { id: 'staffed-service', label: 'Fully Staffed', multiplier: 1.35, description: 'Professional staff serve your guests throughout' },
  ],
  minSpend: 250,
};

export const computeEstimate = (guests: number, perPerson: number, multiplier: number, minSpend: number) =>
  Math.max(Math.round(guests * perPerson * multiplier), minSpend);

export const useQuoteSettings = () =>
  useQuery({
    queryKey: ['quote-settings'],
    queryFn: async (): Promise<QuoteSettings> => {
      const { data, error } = await supabase.from('quote_settings').select('*').eq('id', 1).maybeSingle();
      if (error) throw error;
      if (!data) return DEFAULT_QUOTE_SETTINGS;
      const styles = (data.event_styles as unknown as EventStyle[]) ?? [];
      const levels = (data.service_levels as unknown as ServiceLevel[]) ?? [];
      return {
        eventStyles: styles.length ? styles : DEFAULT_QUOTE_SETTINGS.eventStyles,
        serviceLevels: levels.length ? levels : DEFAULT_QUOTE_SETTINGS.serviceLevels,
        minSpend: Number(data.min_spend ?? 250),
      };
    },
  });
