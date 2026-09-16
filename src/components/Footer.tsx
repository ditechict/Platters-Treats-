import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-3xl font-light heading-elegant mb-1">
            Canapés &amp; Treats
          </div>
          <div className="eyebrow mb-6 [color:hsl(var(--accent))]">Pretty Platters</div>
          <p className="text-sm font-light text-primary-foreground/70 leading-relaxed max-w-xs">
            Sophisticated canapés, elegant platters and curated treats — modern UK
            hospitality with international flair, in the heart of London.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-accent mb-5">Contact</h3>
          <address className="not-italic space-y-2 text-sm font-light text-primary-foreground/70">
            <p>123 Elegant Street, Mayfair</p>
            <p>London W1K 5NA</p>
            <p>
              <a href="tel:+442071234567" className="hover:text-primary-foreground transition-smooth">
                +44 20 7123 4567
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-accent mb-5">Opening Hours</h3>
          <div className="space-y-2 text-sm font-light text-primary-foreground/70">
            <p>Monday – Thursday: 12:00 – 22:00</p>
            <p>Friday – Saturday: 12:00 – 23:00</p>
            <p>Sunday: 12:00 – 21:00</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-primary-foreground/50">
        <p>&copy; {new Date().getFullYear()} Canapés &amp; Treats Pretty Platters. All rights reserved.</p>
        <nav className="flex gap-6" aria-label="Footer">
          <Link to="/menu" className="hover:text-primary-foreground transition-smooth">Menu</Link>
          <Link to="/gallery" className="hover:text-primary-foreground transition-smooth">Gallery</Link>
          <Link to="/contact" className="hover:text-primary-foreground transition-smooth">Contact</Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
