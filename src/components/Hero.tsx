import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-canapes.jpg';
import breakfastHero from '@/assets/breakfast-platter-hero.jpeg.asset.json';

const slides = [
  {
    src: breakfastHero.url,
    alt: 'An abundant breakfast platter with pastries, fruit and savoury dishes',
    position: 'object-[center_58%] md:object-center',
  },
  {
    src: heroImage,
    alt: 'Elegant canapés and artful platters',
    position: 'object-center',
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7150);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const showSlide = (index: number) => setActiveSlide(index);
  const showPrevious = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % slides.length);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured dining photography"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={index !== activeSlide}
            className={`hero-slide absolute inset-0 h-full w-full object-cover ${slide.position} ${
              index === activeSlide ? 'hero-slide-active' : 'hero-slide-inactive'
            }`}
          />
        ))}
        <div className="absolute inset-0 hero-gradient opacity-60"></div>
        <div key={activeSlide} className="hero-light-sweep" aria-hidden="true" />
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

      <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between md:inset-x-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={showPrevious}
          aria-label="Show previous banner image"
          className="h-10 w-10 border border-primary-foreground/25 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={showNext}
          aria-label="Show next banner image"
          className="h-10 w-10 border border-primary-foreground/25 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3" aria-label="Choose banner image">
        {slides.map((slide, index) => (
          <Button
            key={slide.src}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => showSlide(index)}
            aria-label={`Show banner image ${index + 1}`}
            aria-current={index === activeSlide ? 'true' : undefined}
            className="group h-6 w-8 p-0 hover:bg-transparent"
          >
            <span
              className={`block h-px transition-all duration-700 ${
                index === activeSlide ? 'w-8 bg-accent' : 'w-4 bg-primary-foreground/45 group-hover:w-6'
              }`}
            />
          </Button>
        ))}
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