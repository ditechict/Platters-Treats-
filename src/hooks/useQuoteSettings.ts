import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type EventStyle = { id: string; label: string; perPerson: number; description: string };
export type ServiceLevel = { id: string; label: string; multiplier: number; description: string };
export type QuoteSettings = { eventStyles: EventStyle[]; serviceLevels: ServiceLevel[]; minSpend: number };

export const DEFAULT_QUOTE_SETTINGS: QuoteSettings = {
  eventStyles: [
    { id: 'afro-brunch', label: 'Afro-Brunch Spread', perPerson: 0, description: 'Generous brunch favourites for a shared table' },
    { id: 'breakfast-brunch', label: 'Breakfast & Brunch', perPerson: 0, description: 'A relaxed morning gathering' },
    { id: 'brunch-platters', label: 'Brunch Platters', perPerson: 0, description: 'Plates to share around the table' },
    { id: 'custom', label: 'Something Custom', perPerson: 0, description: 'Tell us what you have in mind' },
  ],
  serviceLevels: [
    { id: 'delivery-only', label: 'Delivery', multiplier: 1, description: 'Food delivered to your venue' },
    { id: 'setup-styling', label: 'Set-up & Styling', multiplier: 1, description: 'Ask us to arrange the food display' },
    { id: 'staffed-service', label: 'Staffed Service', multiplier: 1, description: 'Ask about service staff for your event' },
  ],
  minSpend: 0,
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
