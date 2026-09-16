import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useMenuCategories, useMenuItems } from '@/hooks/useContent';
import { SectionHeading } from '@/components/kit/SectionKit';

const MenuSection = () => {
  const { addToCart, openCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: categories = [], isLoading: loadingCategories } = useMenuCategories();
  const { data: items = [], isLoading: loadingItems, isError } = useMenuItems();

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter((item) => item.category_id === selectedCategory);
  }, [items, selectedCategory]);

  const isLoading = loadingCategories || loadingItems;

  return (
    <section className="py-24 subtle-gradient">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="The Collection"
          title="Our Menu"
          lede="Carefully crafted canapés, platters and treats — each one made to order in our London kitchen."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
                    {item.dietary_tags?.map((diet) => (
                      <Badge key={diet} variant="secondary" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                  </div>

                  <CardTitle className="text-lg font-medium mb-2 text-primary">{item.name}</CardTitle>

                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.description}</p>
                  )}
                  {item.serves && <p className="text-xs text-muted-foreground mb-4">{item.serves}</p>}

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
          <p className="text-center text-muted-foreground">No items in this collection yet.</p>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
