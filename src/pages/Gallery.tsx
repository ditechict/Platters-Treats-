import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGalleryImages } from '@/hooks/useContent';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const { data: images = [], isLoading, isError } = useGalleryImages();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(images.map((i) => i.category).filter(Boolean))) as string[],
    [images]
  );

  const visible = filter === 'all' ? images : images.filter((i) => i.category === filter);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-light mb-4 heading-elegant">Gallery</h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
              A visual journey through our culinary artistry and elegant presentations
            </p>
          </div>
        </div>

        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? 'default' : 'outline'}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {isError && (
              <p className="text-center text-muted-foreground">
                We couldn't load the gallery just now. Please refresh the page.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                ))}

              {!isLoading &&
                visible.map((image) => (
                  <Card key={image.id} className="hover-lift border-0 shadow-soft overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        type="button"
                        className="block w-full aspect-square overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        onClick={() => setLightbox({ src: image.src, title: image.title ?? 'Gallery image' })}
                        aria-label={`View ${image.title ?? 'gallery image'} larger`}
                      >
                        <img
                          src={image.src}
                          alt={image.title ?? 'Canapés and Treats presentation'}
                          loading="lazy"
                          className="w-full h-full object-cover transition-smooth hover:scale-105"
                        />
                      </button>
                      <div className="p-6">
                        <h2 className="text-lg font-medium text-primary mb-1">{image.title}</h2>
                        <p className="text-sm text-muted-foreground">{image.category}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-light mb-6 text-primary">
              Ready to create your perfect event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let us craft a bespoke catering experience that will leave your guests in awe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                <Link to="/contact">Request a quote</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/menu">View menu</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0">
          {lightbox && (
            <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
