import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';
import { siteBrand } from '@/lib/siteBrand';

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .trim()
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[0-9\s\-\+\(\)]*$/, 'Phone number can only contain numbers and basic formatting characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

const Contact = () => {
  const [searchParams] = useSearchParams();
  const basketNote = searchParams.get('basket')?.slice(0, 700) ?? '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: basketNote ? `Basket enquiry: ${basketNote}` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('enquiries').insert({
      name: result.data.name.trim(),
      email: result.data.email.trim().toLowerCase(),
      phone: result.data.phone?.trim() || null,
      message: result.data.message.trim(),
    });
    setSubmitting(false);

    if (error) {
      toast.error("We couldn't submit your message just now. Please try again.");
      return;
    }

    toast.success('Thank you — your message has been received.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <div className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-elegant font-light mb-4 heading-elegant">
              Visit Zeren
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
              Find us in Oval for brunch, coffee and a warm welcome.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-elegant font-light mb-6 text-primary">
                    Come by Zeren
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Stop in for Afro-inspired brunch, pancakes, matcha, mocktails and coffee. We also welcome catering enquiries.
                  </p>
                </div>

                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-6 w-6 text-accent" />
                      <div>
                        <h3 className="mb-2 font-medium text-primary">Find us in Oval</h3>
                        <address className="not-italic text-muted-foreground">
                          {siteBrand.address[0]}<br />
                          {siteBrand.address[1]}<br />
                          United Kingdom
                        </address>
                        <Button asChild variant="link" className="mt-3 h-auto px-0 text-primary">
                          <a href="https://www.google.com/maps/search/?api=1&query=82+Bolton+Crescent+Oval+SE5+0SE" target="_blank" rel="noreferrer">
                            Get directions <ArrowUpRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl font-elegant font-light text-primary">
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`transition-smooth focus:shadow-gold ${errors.name ? 'border-destructive' : ''}`}
                            maxLength={100}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                          />
                          {errors.name && (
                            <p id="name-error" className="text-sm text-destructive mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`transition-smooth focus:shadow-gold ${errors.email ? 'border-destructive' : ''}`}
                            maxLength={255}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-sm text-destructive mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`transition-smooth focus:shadow-gold ${errors.phone ? 'border-destructive' : ''}`}
                          maxLength={20}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-sm text-destructive mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={`transition-smooth focus:shadow-gold ${errors.message ? 'border-destructive' : ''}`}
                          placeholder="Tell us about your visit, menu enquiry or catering plans..."
                          maxLength={1000}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                          <p id="message-error" className="text-sm text-destructive mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold font-medium py-3"
                      >
                        {submitting ? 'Sending…' : 'Send Message'}
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

export default Contact;