import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import MenuSection from '@/components/MenuSection';
import GuestSpotlightCarousel from '@/components/GuestSpotlightCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Coffee } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      {/* Featured Menu Section */}
      <MenuSection />

      
      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-elegant font-light mb-6 text-primary heading-elegant">
              A Table at Zeren
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A neighbourhood café for relaxed brunch, vibrant plates and drinks worth lingering over — with thoughtful catering for gatherings beyond our table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Coffee className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">Afro-Brunch</h3>
                <p className="text-sm text-muted-foreground">Generous plates, savoury favourites and sweet stacks.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">A Little Something for Everyone</h3>
                <p className="text-sm text-muted-foreground">Pancakes, matcha, mocktails and coffee.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">Gather Around</h3>
                <p className="text-sm text-muted-foreground">Catering for celebrations, teams and shared moments.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guest spotlight */}
      <GuestSpotlightCarousel />

      {/* Call to Action */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-elegant font-light mb-6 heading-elegant">
            Bring Zeren to Your Gathering
          </h2>
          <p className="text-xl font-light mb-8 max-w-2xl mx-auto opacity-95">
            Tell us about your occasion and we’ll help shape a catering enquiry around your gathering.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold font-medium px-8 py-3">
              <Link to="/quote">Plan Catering</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-medium px-8 py-3">
              <Link to="/contact">Visit Zeren</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
