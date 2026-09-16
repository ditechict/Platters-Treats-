import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import MenuSection from '@/components/MenuSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Users, Award, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-elegant font-light mb-6 text-primary heading-elegant">
              About Canapés & Treats
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nestled in the heart of London, we bring together sophisticated British hospitality 
              with international culinary flair. Each canapé is crafted as a work of art, 
              designed to delight both the eye and palate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">Award Winning</h3>
                <p className="text-sm text-muted-foreground">Recognized for culinary excellence</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">Private Events</h3>
                <p className="text-sm text-muted-foreground">Bespoke catering solutions</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Only the finest ingredients</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-soft hover-lift">
              <CardContent className="p-8">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary mb-2">Fresh Daily</h3>
                <p className="text-sm text-muted-foreground">Made fresh every morning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <MenuSection />

      {/* Call to Action */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-elegant font-light mb-6 heading-elegant">
            Experience Culinary Excellence
          </h2>
          <p className="text-xl font-light mb-8 max-w-2xl mx-auto opacity-95">
            Book your table today and discover why we're London's premier destination 
            for sophisticated canapés and artisanal treats.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold font-medium px-8 py-3">
              <Link to="/contact">Reserve Table</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium px-8 py-3">
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
