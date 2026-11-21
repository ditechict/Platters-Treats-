import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import BrandLockup from '@/components/BrandLockup';
import { Button } from '@/components/ui/button';
import { siteBrand, siteNavigation } from '@/lib/siteBrand';

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-14 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
        <div>
          <BrandLockup variant="footer" />
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-primary-foreground/70">
            Afro-inspired brunch, generous plates and welcoming café moments in Oval.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Visit</h2>
          <address className="not-italic text-sm font-light leading-relaxed text-primary-foreground/75">
            {siteBrand.address[0]}<br />
            {siteBrand.address[1]}
          </address>
          <Button asChild variant="link" className="mt-2 h-auto px-0 text-primary-foreground hover:text-accent">
            <a href="https://www.google.com/maps/search/?api=1&query=82+Bolton+Crescent+Oval+SE5+0SE" target="_blank" rel="noreferrer">
              <MapPin className="mr-2 h-4 w-4" /> Directions <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div>
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Explore</h2>
          <nav className="flex flex-col items-start gap-2 text-sm font-light text-primary-foreground/75" aria-label="Footer">
            {siteNavigation.filter((item) => item.href !== '/').map((item) => (
              <Link key={item.href} to={item.href} className="transition-smooth hover:text-primary-foreground">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs font-light text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Zeren Café &amp; Catering</p>
        <p>{siteBrand.address.join(', ')}</p>
      </div>
    </div>
  </footer>
);

export default Footer;