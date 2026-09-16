import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getTotalItems, openCart } = useCart();

  const isHome = location.pathname === '/';
  // Transparent over the cinematic hero on the home page, ivory once scrolled
  const transparent = isHome && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const cartCount = getTotalItems();

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-ease',
        transparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-sm border-b border-border shadow-soft'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Wordmark */}
          <Link to="/" className={cn('transition-smooth', transparent ? 'text-white' : 'text-primary')}>
            <span className="font-display text-2xl md:text-[1.7rem] font-light heading-elegant block leading-none">
              Canapés &amp; Treats
            </span>
            <span
              className={cn(
                'text-[0.65rem] uppercase tracking-[0.35em] font-light',
                transparent ? 'text-white/70' : 'text-accent'
              )}
            >
              Pretty Platters
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative text-sm font-light tracking-[0.14em] uppercase transition-smooth pb-1',
                    transparent
                      ? active
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                      : active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary',
                    'after:absolute after:left-0 after:bottom-0 after:h-px after:bg-accent after:transition-all after:duration-300',
                    active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={openCart}
              aria-label={`Open basket${cartCount ? `, ${cartCount} items` : ''}`}
              className={cn(
                'relative p-2 transition-smooth',
                transparent ? 'text-white hover:text-accent' : 'text-primary hover:text-accent'
              )}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[0.65rem] rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/contact"
              className={cn(
                'hidden lg:inline-block text-sm font-light tracking-[0.14em] uppercase border px-6 py-2.5 transition-smooth',
                transparent
                  ? 'border-white/40 text-white hover:bg-white/10'
                  : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
              )}
            >
              Enquire
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={openCart}
              aria-label={`Open basket${cartCount ? `, ${cartCount} items` : ''}`}
              className={cn('relative p-2', transparent ? 'text-white' : 'text-primary')}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[0.65rem] rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className={cn('p-2', transparent ? 'text-white' : 'text-primary')}
            >
              {isMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — full-screen overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-background z-40 flex flex-col">
          <nav className="flex flex-col px-8 pt-10 gap-2" aria-label="Mobile">
            {navigation.map((item, i) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'font-display text-4xl font-light heading-elegant py-3 border-b border-border/60 transition-smooth',
                  location.pathname === item.href ? 'text-accent' : 'text-primary hover:text-accent'
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-8 pb-10">
            <Link
              to="/contact"
              className="block text-center text-sm font-light tracking-[0.2em] uppercase border border-primary/30 text-primary px-6 py-3.5 hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
