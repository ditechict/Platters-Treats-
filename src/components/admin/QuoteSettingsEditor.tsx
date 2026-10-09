import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuoteSettings, type QuoteSettings } from '@/hooks/useQuoteSettings';

const QuoteSettingsEditor = () => {
  const { data, isLoading } = useQuoteSettings();
  const qc = useQueryClient();
  const [draft, setDraft] = useState<QuoteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setDraft(structuredClone(data)); }, [data]);
  if (isLoading || !draft) return <p className="text-muted-foreground">Loading…</p>;

  const save = async () => {
    const bad =
      draft.minSpend < 0 ||
      draft.eventStyles.some((s) => !s.label.trim() || !(s.perPerson >= 0)) ||
      draft.serviceLevels.some((s) => !s.label.trim() || !(s.multiplier >= 1));
    if (bad) { toast.error('Check values: prices ≥ 0, markups ≥ 0%, names required.'); return; }
    setSaving(true);
    const { error } = await supabase.from('quote_settings').upsert({
      id: 1,
      event_styles: draft.eventStyles as never,
      service_levels: draft.serviceLevels as never,
      min_spend: draft.minSpend,
    });
    setSaving(false);
    if (error) { toast.error('Could not save pricing.'); return; }
    toast.success('Quote pricing saved');
    qc.invalidateQueries({ queryKey: ['quote-settings'] });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-soft"><CardContent className="p-5 space-y-3">
        <h3 className="font-medium text-primary">Per-guest prices (£)</h3>
        {draft.eventStyles.map((s, i) => (
          <div key={s.id} className="grid grid-cols-[1fr_120px] gap-3">
            <Input value={s.label} aria-label="Style name" onChange={(e) => {
              const v = [...draft.eventStyles]; v[i] = { ...s, label: e.target.value }; setDraft({ ...draft, eventStyles: v });
            }} />
            <Input type="number" min={0} step="0.5" value={s.perPerson} aria-label={`${s.label} price per guest`} onChange={(e) => {
              const v = [...draft.eventStyles]; v[i] = { ...s, perPerson: Number(e.target.value) }; setDraft({ ...draft, eventStyles: v });
            }} />
          </div>
        ))}
      </CardContent></Card>

      <Card className="border-0 shadow-soft"><CardContent className="p-5 space-y-3">
        <h3 className="font-medium text-primary">Service markups (%)</h3>
        {draft.serviceLevels.map((s, i) => (
          <div key={s.id} className="grid grid-cols-[1fr_120px] gap-3">
            <Input value={s.label} aria-label="Service name" onChange={(e) => {
              const v = [...draft.serviceLevels]; v[i] = { ...s, label: e.target.value }; setDraft({ ...draft, serviceLevels: v });
            }} />
            <Input type="number" min={0} step="1" value={Math.round((s.multiplier - 1) * 100)} aria-label={`${s.label} markup percent`} onChange={(e) => {
              const v = [...draft.serviceLevels]; v[i] = { ...s, multiplier: 1 + Number(e.target.value) / 100 }; setDraft({ ...draft, serviceLevels: v });
            }} />
          </div>
        ))}
      </CardContent></Card>

      <Card className="border-0 shadow-soft"><CardContent className="p-5 space-y-3">
        <h3 className="font-medium text-primary">Minimum spend (£)</h3>
        <Input type="number" min={0} value={draft.minSpend} aria-label="Minimum spend"
          onChange={(e) => setDraft({ ...draft, minSpend: Number(e.target.value) })} className="max-w-[160px]" />
      </CardContent></Card>

      <Button onClick={save} disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
        {saving ? 'Saving…' : 'Save pricing'}
      </Button>
    </div>
  );
};

export default QuoteSettingsEditor;
