import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/kit/SectionKit';
const highlights = [
  {
    number: '01',
    category: 'Afro-Brunch',
    name: 'The Savanna Sunrise',
    description: 'Scrambled eggs, seasoned beans, fried plantain, Cumberland sausage and Agege bread.',
  },
  {
    number: '02',
    category: 'Pancakes & French Toast',
    name: 'Pancakes & French Toast',
    description: 'Golden French toast stacks served with runny egg and bacon.',
  },
  {
    number: '03',
    category: 'Full English & Brunch',
    name: 'Full English',
    description: 'A full brunch plate with classic breakfast favourites.',
  },
  {
    number: '04',
    category: 'Café Drinks',
    name: 'Matcha, Mocktails & Coffee',
    description: 'Pancakes, matchas, mocktails and coffee.',
  },
];

const MenuSection = () => (
  <section className="py-24 subtle-gradient">
    <div className="container mx-auto px-4">
      <SectionHeading
        eyebrow="From the café"
        title="A taste of Zeren"
        lede="Afro-inspired brunch, golden stacks and refreshing drinks in Oval."
      />

      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 md:gap-x-12">
        {highlights.map((item) => (
          <article key={item.number} className="grid grid-cols-[1.25rem_1fr] gap-2 border-t border-border py-6 md:grid-cols-[2.5rem_1fr] md:gap-4">
            <span className="pt-1 text-xs text-accent">{item.number}</span>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{item.category}</p>
              <h3 className="font-display text-xl font-medium text-primary md:text-2xl">{item.name}</h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/contact">Ask about the menu <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/quote">Catering enquiries</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default MenuSection;
