import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Sparkles, ConciergeBell, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { GUEST_MOMENTS } from '@/lib/images';

const MIN_GUESTS = 10;
const MAX_GUESTS = 500;

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address').max(200),
  phone: z.string().trim().max(40).regex(/^[0-9\s\-+()]*$/, 'Phone can only contain numbers and basic formatting').optional().or(z.literal('')),
  eventDate: z.string().optional().or(z.literal('')),
  notes: z.string().trim().max(4000).optional().or(z.literal('')),
  tastingNotes: z.string().trim().max(2000).optional().or(z.literal('')),
});

const EVENT_STYLES = [
  { id: 'afro-brunch', label: 'Afro-Brunch Spread', description: 'Generous brunch favourites for a shared table.' },
  { id: 'breakfast-brunch', label: 'Breakfast & Brunch', description: 'A relaxed morning gathering.' },
  { id: 'brunch-platters', label: 'Brunch Platters', description: 'Plates to share around the table.' },
  { id: 'custom', label: 'Something Custom', description: 'Tell us what you have in mind.' },
];

const SERVICE_LEVELS = [
  { id: 'delivery-only', label: 'Delivery', description: 'Food delivered to your venue.' },
  { id: 'setup-styling', label: 'Set-up & Styling', description: 'Ask us to arrange the food display.' },
  { id: 'staffed-service', label: 'Staffed Service', description: 'Ask about service staff for your event.' },
];

const Quote = () => {
  const [guests, setGuests] = useState(50);
  const [styleId, setStyleId] = useState<string>(EVENT_STYLES[0].id);
  const [serviceId, setServiceId] = useState<string>(SERVICE_LEVELS[0].id);
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', notes: '', tastingNotes: '' });
  const [hasTasting, setHasTasting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const style = EVENT_STYLES.find((s) => s.id === styleId) ?? EVENT_STYLES[0];
  const service = SERVICE_LEVELS.find((s) => s.id === serviceId) ?? SERVICE_LEVELS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    const summary = [
       `Catering enquiry: ${guests} guests, ${style.label}, ${service.label}`,
       hasTasting ? 'Private Tasting & Menu Consultation requested; pricing to be confirmed.' : null,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : null,
    ].filter(Boolean).join('\n');

    setSubmitting(true);
    const { error } = await supabase.from('event_bookings').insert({
      name: result.data.name.trim(),
      email: result.data.email.trim().toLowerCase(),
      phone: result.data.phone?.trim() || null,
      event_type: style.label,
      event_date: result.data.eventDate || null,
      guest_count: guests,
      package_name: service.label,
      notes: summary,
       has_tasting_requested: hasTasting,
       tasting_notes: hasTasting ? result.data.tastingNotes?.trim() || null : null,
    });
    setSubmitting(false);

    if (error) {
      toast.error("We couldn't submit your catering enquiry just now. Please try again.");
      return;
    }

    toast.success('Thank you — your catering enquiry has been received.');
     setForm({ name: '', email: '', phone: '', eventDate: '', notes: '', tastingNotes: '' });
     setHasTasting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-elegant font-light mb-4 heading-elegant">
              Catering Enquiry
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
              Tell us about your gathering and the service you have in mind.
            </p>
          </div>
        </div>

        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Event details */}
              <div className="space-y-8">
                {/* Guests */}
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="flex items-center gap-2 text-lg font-medium text-primary">
                        <Users className="h-5 w-5 text-accent" /> Guests
                      </h2>
                      <span className="font-display text-3xl text-accent">{guests}</span>
                    </div>
                    <input
                      type="range"
                      min={MIN_GUESTS}
                      max={MAX_GUESTS}
                      step={5}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      aria-label="Number of guests"
                      className="w-full accent-[hsl(var(--accent))]"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{MIN_GUESTS}</span>
                      <span>{MAX_GUESTS}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Event style */}
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="flex items-center gap-2 text-lg font-medium text-primary mb-4">
                      <Sparkles className="h-5 w-5 text-accent" /> Event Style
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {EVENT_STYLES.map((s) => (
                        <Button
                          key={s.id}
                          type="button"
                          variant={styleId === s.id ? 'secondary' : 'outline'}
                          onClick={() => setStyleId(s.id)}
                          aria-pressed={styleId === s.id}
                          className={cn('h-auto justify-start whitespace-normal p-4 text-left', styleId === s.id && 'border-accent shadow-gold')}
                        >
                          <span className="block font-medium text-primary">{s.label}</span>
                          <span className="block text-xs text-muted-foreground mt-1">{s.description}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Service level */}
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="flex items-center gap-2 text-lg font-medium text-primary mb-4">
                      <ConciergeBell className="h-5 w-5 text-accent" /> Service Level
                    </h2>
                    <div className="space-y-3">
                      {SERVICE_LEVELS.map((s) => (
                        <Button
                          key={s.id}
                          type="button"
                          variant={serviceId === s.id ? 'secondary' : 'outline'}
                          onClick={() => setServiceId(s.id)}
                          aria-pressed={serviceId === s.id}
                          className={cn('h-auto w-full justify-between gap-4 whitespace-normal p-4 text-left', serviceId === s.id && 'border-accent shadow-gold')}
                        >
                          <span>
                            <span className="block font-medium text-primary">{s.label}</span>
                            <span className="block text-xs text-muted-foreground mt-1">{s.description}</span>
                          </span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className="border-t border-border pt-8">
                  <img src={GUEST_MOMENTS[0].src} alt={GUEST_MOMENTS[0].alt} loading="lazy" className="w-full aspect-[16/9] object-cover object-[center_45%] mb-6" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-3xl text-primary mb-2">Private Tasting &amp; Menu Consultation</h2>
                      <p className="text-sm text-muted-foreground">Request a private tasting alongside your catering enquiry. Availability and pricing will be confirmed with you.</p>
                    </div>
                    <Switch id="q-tasting" checked={hasTasting} onCheckedChange={setHasTasting} aria-label="Add Private Tasting Session" />
                  </div>
                  <label htmlFor="q-tasting" className="block text-sm text-primary mt-4">Add Private Tasting Session</label>
                  {hasTasting && (
                    <div className="mt-4 space-y-3">
                      <label htmlFor="q-tasting-notes" className="block text-sm text-primary">Tasting preferences</label>
                      <Textarea id="q-tasting-notes" name="tastingNotes" value={form.tastingNotes} onChange={handleChange} maxLength={2000} rows={3} placeholder="Dishes to try, dietary requirements, preferred timing…" aria-invalid={!!errors.tastingNotes} />
                      {errors.tastingNotes && <p className="text-sm text-destructive">{errors.tastingNotes}</p>}
                    </div>
                  )}
                </div>
              </div>

              {/* Enquiry summary + booking form */}
              <div className="space-y-8">
                <Card className="border-0 shadow-elegant bg-primary text-primary-foreground">
                  <CardContent className="p-8 text-center">
                    <p className="text-sm uppercase tracking-[0.25em] opacity-70 mb-2">Your enquiry</p>
                    <p className="font-display text-4xl md:text-5xl heading-elegant text-accent" aria-live="polite">{guests} guests</p>
                    <p className="text-sm opacity-80 mt-3">{style.label} · {service.label}</p>
                    {hasTasting && <p className="text-sm text-accent mt-3">Private tasting requested</p>}
                    <p className="text-xs opacity-70 mt-4">We’ll confirm menu options, availability and pricing after reviewing your request.</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl font-elegant font-light text-primary">
                      Send a Catering Enquiry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="q-name" className="block text-sm font-medium text-primary mb-2">Name *</label>
                          <Input
                            id="q-name" name="name" required maxLength={120}
                            value={form.name} onChange={handleChange}
                            className={errors.name ? 'border-destructive' : ''}
                            aria-invalid={!!errors.name}
                          />
                          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="q-email" className="block text-sm font-medium text-primary mb-2">Email *</label>
                          <Input
                            id="q-email" name="email" type="email" required maxLength={200}
                            value={form.email} onChange={handleChange}
                            className={errors.email ? 'border-destructive' : ''}
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="q-phone" className="block text-sm font-medium text-primary mb-2">Phone</label>
                          <Input
                            id="q-phone" name="phone" type="tel" maxLength={40}
                            value={form.phone} onChange={handleChange}
                            className={errors.phone ? 'border-destructive' : ''}
                            aria-invalid={!!errors.phone}
                          />
                          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label htmlFor="q-date" className="block text-sm font-medium text-primary mb-2">
                            <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Event Date</span>
                          </label>
                          <Input
                            id="q-date" name="eventDate" type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={form.eventDate} onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="q-notes" className="block text-sm font-medium text-primary mb-2">Notes</label>
                        <Textarea
                          id="q-notes" name="notes" rows={3} maxLength={4000}
                          placeholder="Dietary needs, venue details, timings…"
                          value={form.notes} onChange={handleChange}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold font-medium py-3"
                      >
                         {submitting ? 'Sending…' : 'Send Catering Enquiry'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Quote;
