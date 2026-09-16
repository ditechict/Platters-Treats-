import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      toast.error("We couldn't send your message. Please try again or call us.");
      return;
    }

    toast.success("Thank you for your message! We'll get back to you soon.");
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
              Get in touch to create your perfect dining experience
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
                    Visit Our Restaurant
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Located in the heart of London, we offer an intimate dining experience 
                    with the finest canapés and artisanal treats.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-accent mt-1" />
                        <div>
                          <h3 className="font-medium text-primary mb-2">Address</h3>
                          <p className="text-muted-foreground">
                            123 Elegant Street<br />
                            Mayfair, London W1K 5NA<br />
                            United Kingdom
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-accent mt-1" />
                        <div>
                          <h3 className="font-medium text-primary mb-2">Phone</h3>
                          <p className="text-muted-foreground">+44 20 7123 4567</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-accent mt-1" />
                        <div>
                          <h3 className="font-medium text-primary mb-2">Email</h3>
                          <p className="text-muted-foreground">hello@canapesandtreats.co.uk</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-accent mt-1" />
                        <div>
                          <h3 className="font-medium text-primary mb-2">Opening Hours</h3>
                          <div className="text-muted-foreground space-y-1">
                            <p>Monday - Thursday: 12:00 - 22:00</p>
                            <p>Friday - Saturday: 12:00 - 23:00</p>
                            <p>Sunday: 12:00 - 21:00</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                          placeholder="Tell us about your event or dining preferences..."
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
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold font-medium py-3"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;