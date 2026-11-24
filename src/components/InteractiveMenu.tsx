import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal, UtensilsCrossed, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CAFE_MENU, MENU_CATEGORIES } from '@/lib/cafeMenu';
import {
  ALLERGEN_LABELS,
  DIETARY_FILTERS,
  filterMenuItems,
  labelForAllergen,
  labelForDietary,
} from '@/lib/menuFilters';

const formatPrice = (price: number | null) =>
  price === null
    ? 'Price to be confirmed'
    : new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);

const InteractiveMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [avoidedAllergens, setAvoidedAllergens] = useState<string[]>([]);

  const dietaryFilters = useMemo(
    () => DIETARY_FILTERS.filter((filter) => selectedDietary.includes(filter.key)),
    [selectedDietary],
  );

  const visibleItems = useMemo(
    () => filterMenuItems(CAFE_MENU, {
      category: selectedCategory,
      dietaryFilters,
      avoidAllergens: avoidedAllergens,
    }),
    [selectedCategory, dietaryFilters, avoidedAllergens],
  );

  const hasFilters = selectedCategory !== 'all' || selectedDietary.length > 0 || avoidedAllergens.length > 0;

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDietary([]);
    setAvoidedAllergens([]);
  };

  const toggleValue = (value: string, values: string[], setValues: (next: string[]) => void) => {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="full-menu-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The full café menu</p>
          <h2 id="full-menu-heading" className="mt-5 font-display text-4xl font-medium text-primary md:text-5xl">
            Find your brunch favourite
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Browse by category or filter by dietary preference. Prices, complete ingredient lists and dietary labels are being confirmed with the kitchen.
          </p>
        </div>

        <div className="mt-10 border-y border-border py-5" aria-label="Menu categories">
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by menu category">
            <Button
              type="button"
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              size="sm"
              aria-pressed={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            >
              All categories
            </Button>
            {MENU_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                type="button"
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                className="shrink-0"
                aria-pressed={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-sm border border-border bg-card p-4 shadow-soft md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Dietary filters
            </div>
            {hasFilters && (
              <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4" aria-hidden="true" />
                Clear all
              </Button>
            )}
          </div>

          <fieldset className="mt-4">
            <legend className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Show options for</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {DIETARY_FILTERS.map((filter) => {
                const active = selectedDietary.includes(filter.key);
                return (
                  <Button
                    key={filter.key}
                    type="button"
                    variant={active ? 'secondary' : 'outline'}
                    size="sm"
                    aria-pressed={active}
                    onClick={() => toggleValue(filter.key, selectedDietary, setSelectedDietary)}
                  >
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </fieldset>

          <details className="mt-5 border-t border-border pt-4">
            <summary className="cursor-pointer text-sm font-medium text-primary">Avoid specific allergens</summary>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Items without a kitchen-confirmed allergen list are hidden when you select an exclusion.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(ALLERGEN_LABELS).map((allergen) => {
                const active = avoidedAllergens.includes(allergen);
                return (
                  <Button
                    key={allergen}
                    type="button"
                    variant={active ? 'secondary' : 'outline'}
                    size="sm"
                    aria-pressed={active}
                    aria-label={`Exclude ${labelForAllergen(allergen)}`}
                    onClick={() => toggleValue(allergen, avoidedAllergens, setAvoidedAllergens)}
                  >
                    {labelForAllergen(allergen)}
                  </Button>
                );
              })}
            </div>
          </details>
        </div>

        <p className="mt-8 text-sm text-muted-foreground" role="status" aria-live="polite">
          {visibleItems.length} {visibleItems.length === 1 ? 'menu item' : 'menu items'} shown
        </p>

        {visibleItems.length > 0 ? (
          <div className="mt-4 space-y-12">
            {MENU_CATEGORIES.map((category) => {
              const items = visibleItems.filter((item) => item.category === category.id);
              if (items.length === 0) return null;

              return (
                <section key={category.id} aria-labelledby={`menu-category-${category.id}`}>
                  <div className="mb-5 border-b border-border pb-4">
                    <h3 id={`menu-category-${category.id}`} className="font-display text-3xl font-medium text-primary">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-6 xl:grid-cols-3">
                    {items.map((item) => (
                      <article key={item.id} className="flex min-w-0 flex-col rounded-sm border border-border bg-card p-4 shadow-soft md:p-6">
                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent md:text-xs">{category.name}</p>
                        <h4 className="mt-2 font-display text-xl font-medium leading-tight text-primary md:text-2xl">{item.name}</h4>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">{item.description}</p>

                        <div className="mt-4">
                          <h5 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Ingredients</h5>
                          {item.ingredients.length > 0 ? (
                            <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                              {item.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                            </ul>
                          ) : (
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">Ask our team about today’s ingredients and preparation.</p>
                          )}
                        </div>

                        {item.dietaryTags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Dietary labels">
                            {item.dietaryTags.map((tag) => <Badge key={tag} variant="secondary">{labelForDietary(tag)}</Badge>)}
                          </div>
                        )}

                        <div className="mt-6 border-t border-border pt-4 text-sm font-medium text-primary">
                          {formatPrice(item.price)}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-sm border border-dashed border-border bg-card px-6 py-12 text-center">
            <UtensilsCrossed className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl font-medium text-primary">No confirmed matches yet</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              We only show dietary and allergen matches confirmed by the kitchen. Clear the filters or ask our team about suitable options.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button type="button" variant="outline" onClick={clearFilters}>Clear filters</Button>
              <Button asChild>
                <Link to="/contact">Ask the team <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </Button>
            </div>
          </div>
        )}

        <aside className="mt-12 border-l-2 border-accent bg-secondary/50 p-5 text-sm leading-relaxed text-secondary-foreground">
          <strong className="font-semibold">Allergies or dietary requirements?</strong> Please speak to the Zeren team before ordering. Menu labels and ingredient details are only published once confirmed.
        </aside>
      </div>
    </section>
  );
};

export default InteractiveMenu;
