import { useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

// Import existing images for gallery
import heroImage from '@/assets/hero-canapes.jpg';
import salmonCanape from '@/assets/salmon-canape.jpg';
import truffleTartlets from '@/assets/truffle-tartlets.jpg';
import prosciuttoAsparagus from '@/assets/prosciutto-asparagus.jpg';
import chocolateTruffles from '@/assets/chocolate-truffles.jpg';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      id: '1',
      src: heroImage,
      title: 'Elegant Canapé Selection',
      description: 'Our signature platter arrangement'
    },
    {
      id: '2',
      src: salmonCanape,
      title: 'Smoked Salmon Canapés',
      description: 'Premium Scottish salmon presentation'
    },
    {
      id: '3',
      src: truffleTartlets,
      title: 'Truffle Tartlets',
      description: 'Artisanal goat cheese and truffle creation'
    },
    {
      id: '4',
      src: prosciuttoAsparagus,
      title: 'Prosciutto Asparagus',
      description: 'Italian-inspired elegant wraps'
    },
    {
      id: '5',
      src: chocolateTruffles,
      title: 'Chocolate Truffles',
      description: 'Hand-crafted luxury confections'
    },
    {
      id: '6',
      src: heroImage,
      title: 'Event Catering',
      description: 'Bespoke platter arrangements for special occasions'
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
              <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-medium transition-smooth shadow-gold">
                Request Quote
              </button>
              <button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-medium transition-smooth">
                View Menu
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gallery;