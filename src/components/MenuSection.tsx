import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useMenuCategories, useMenuItems, type MenuItemRow } from '@/hooks/useContent';
import { SectionHeading } from '@/components/kit/SectionKit';
import {
  DIETARY_FILTERS,
  avoidsSelectedAllergens,
  labelForAllergen,
  labelForDietary,
  matchesDietaryFilter,
  presentAllergens,
} from '@/lib/menuFilters';

const MenuSection = () => {
  const { addToCart, openCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [avoidAllergens, setAvoidAllergens] = useState<string[]>([]);

  const { data: categories = [], isLoading: loadingCategories } = useMenuCategories();
  const { data: items = [], isLoading: loadingItems, isError } = useMenuItems();

  // Every allergen present on the menu becomes a "free from" choice
  const availableAllergens = useMemo(() => {
    const present = new Set<string>();
    items.forEach((item) => item.allergens?.forEach((a) => present.add(a)));
    return [...present].sort((a, b) => (ALLERGEN_LABELS[a] ?? a).localeCompare(ALLERGEN_LABELS[b] ?? b));
  }, [items]);

  const toggleDietary = (key: string) =>
    setDietaryFilters((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key]
    );

  const toggleAvoid = (key: string) =>
    setAvoidAllergens((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key]
    );

  const clearFilters = () => {
    setDietaryFilters([]);
    setAvoidAllergens([]);
  };

  const hasActiveFilters = dietaryFilters.length > 0 || avoidAllergens.length > 0;

  const filteredItems = useMemo(() => {
    const activeDietary = DIETARY_FILTERS.filter((f) => dietaryFilters.includes(f.key));
    const collection = items
      .filter((item) => (selectedCategory === 'all' ? true : item.category_id === selectedCategory))
      .filter((item) => activeDietary.every((filter) => matchesDietaryFilter(item, filter)))
      .filter((item) => !(item.allergens ?? []).some((a) => avoidAllergens.includes(a)));
    return [...collection].sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
  }, [items, selectedCategory, dietaryFilters, avoidAllergens]);

  const isLoading = loadingCategories || loadingItems;

  return (
    <section className="py-24 subtle-gradient">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="The Collection"
          title="Our Menu"
          lede="Carefully crafted canapés, platters and treats — each one made to order in our London kitchen."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="transition-smooth"
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-smooth"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Dietary & allergen filters */}
        <div className="max-w-3xl mx-auto mb-8 space-y-3 rounded-lg border border-border bg-card/70 px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Dietary</span>
            {DIETARY_FILTERS.map((filter) => (
              <Button
                key={filter.key}
                type="button"
                variant={dietaryFilters.includes(filter.key) ? 'default' : 'outline'}
                size="sm"
                aria-pressed={dietaryFilters.includes(filter.key)}
                onClick={() => toggleDietary(filter.key)}
                className="h-8 rounded-full px-4 text-xs transition-smooth"
              >
                {filter.label}
              </Button>
            ))}
          </div>
          {availableAllergens.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Free from</span>
              {availableAllergens.map((allergen) => (
                <Button
                  key={allergen}
                  type="button"
                  variant={avoidAllergens.includes(allergen) ? 'default' : 'outline'}
                  size="sm"
                  aria-pressed={avoidAllergens.includes(allergen)}
                  onClick={() => toggleAvoid(allergen)}
                  className="h-8 rounded-full px-4 text-xs transition-smooth"
                >
                  {labelForAllergen(allergen)}
                </Button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <p className="text-xs text-muted-foreground">
              Allergen details are a guide — please share any allergies with us when booking.
            </p>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {isError && (
          <p className="text-center text-muted-foreground">
            We couldn't load the menu just now. Please refresh the page.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}

          {!isLoading &&
            filteredItems.map((item) => (
              <Card key={item.id} className="hover-lift border-0 shadow-soft bg-card overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-smooth hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.is_featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                    {item.dietary_tags?.map((diet) => (
                      <Badge key={diet} variant="secondary" className="text-xs">
                        {labelForDietary(diet)}
                      </Badge>
                    ))}
                  </div>

                  <CardTitle className="text-lg font-medium mb-2 text-primary">{item.name}</CardTitle>

                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.description}</p>
                  )}
                  {item.serves && <p className="text-xs text-muted-foreground mb-1">{item.serves}</p>}

                  <p className="text-xs text-muted-foreground mb-4">
                    {(item.allergens ?? []).length > 0 ? (
                      <>
                        <span className="font-medium text-foreground/70">Contains:</span>{' '}
                        {item.allergens.map((a) => labelForAllergen(a)).join(', ')}
                      </>
                    ) : (
                      'No listed allergens'
                    )}
                  </p>

                  <div className="text-2xl font-light text-accent">£{Number(item.price).toFixed(2)}</div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: Number(item.price),
                        image: item.src,
                        description: item.description ?? '',
                      });
                      toast.success(`${item.name} added to basket`);
                      openCart();
                    }}
                    className="w-full hover-gold transition-smooth"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Basket
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        {!isLoading && filteredItems.length === 0 && !isError && (
          <p className="text-center text-muted-foreground">
            {hasActiveFilters
              ? 'No items match these dietary filters — try removing one.'
              : 'No items in this collection yet.'}
          </p>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
