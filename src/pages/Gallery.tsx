import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import gallery images
import platterMeats from '@/assets/platter-meats.jpg';
import buffetDisplay from '@/assets/buffet-display.jpg';
import elegantSpread from '@/assets/elegant-spread.jpg';
import presentationDisplay from '@/assets/presentation-display.jpg';
import demiledEggs from '@/assets/deviled-eggs.jpg';
import salmonBenedict from '@/assets/salmon-benedict.jpg';
import breakfastPlatter from '@/assets/breakfast-platter.jpg';
import gourmetBreakfast from '@/assets/gourmet-breakfast.jpg';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      id: '1',
      src: platterMeats,
      title: 'Premium Meat Platters',
      description: 'Expertly grilled meats with fresh garnishes'
    },
    {
      id: '2',
      src: buffetDisplay,
      title: 'Elegant Buffet Presentation',
      description: 'Complete catering spread with ambient lighting'
    },
    {
      id: '3',
      src: elegantSpread,
      title: 'Artisanal Food Display',
      description: 'Bespoke platters for special events'
    },
    {
      id: '4',
      src: presentationDisplay,
      title: 'Signature Presentation',
      description: 'Theatrical food displays with dry ice effect'
    },
    {
      id: '5',
      src: demiledEggs,
      title: 'Gourmet Deviled Eggs',
      description: 'Classic appetizers with modern twist'
    },
    {
      id: '6',
      src: salmonBenedict,
      title: 'Eggs Benedict Selection',
      description: 'Premium brunch offerings with smoked salmon'
    },
    {
      id: '7',
      src: breakfastPlatter,
      title: 'Breakfast Platter',
      description: 'Complete morning spread with fresh fruits'
    },
    {
      id: '8',
      src: gourmetBreakfast,
      title: 'Artisan Brunch Bowls',
      description: 'Beautifully plated gourmet breakfast selections'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <div className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-elegant font-light mb-4 heading-elegant">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
              A visual journey through our culinary artistry and elegant presentations
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <Card 
                  key={image.id} 
                  className="hover-lift border-0 shadow-soft overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-smooth hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-primary mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {image.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-elegant font-light mb-6 text-primary">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let us craft a bespoke catering experience that will leave your guests in awe
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                <Link to="/contact">Request Quote</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gallery;