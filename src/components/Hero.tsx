import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-canapes.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Elegant canapés and artful platters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
          ))}
          <span className="ml-2 text-sm font-light tracking-wide opacity-90">
            Award-Winning Cuisine
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-elegant font-light mb-6 heading-elegant">
          Canapés & Treats
          <span className="block text-3xl md:text-4xl text-accent font-normal mt-2">
            Pretty Platters
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
          Sophisticated canapés, elegant platters, and curated global treats. 
          Modern UK hospitality with international flair.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold font-medium px-8 py-3">
            <Link to="/menu">
              View Our Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium px-8 py-3"
          >
            <Link to="/contact">Reserve a Table</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-light text-accent">50+</div>
            <div className="text-sm font-light opacity-80">Signature Canapés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-accent">15+</div>
            <div className="text-sm font-light opacity-80">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-accent">5★</div>
            <div className="text-sm font-light opacity-80">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — restrained pulse, no bounce */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <div className="w-px h-12 bg-white/30 overflow-hidden">
          <div className="w-full h-1/2 bg-accent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;