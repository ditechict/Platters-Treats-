import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { toast } from 'sonner';

// Import menu item images
import salmonCanape from '@/assets/salmon-canape.jpg';
import truffleTartlets from '@/assets/truffle-tartlets.jpg';
import prosciuttoAsparagus from '@/assets/prosciutto-asparagus.jpg';
import chocolateTruffles from '@/assets/chocolate-truffles.jpg';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'canapés' | 'platters' | 'treats';
  dietary: string[];
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Smoked Salmon Canapés',
    description: 'Premium Scottish salmon on artisanal crackers with cream cheese, dill, and micro greens',
    price: 4.50,
    image: salmonCanape,
    category: 'canapés',
    dietary: ['gluten-free option']
  },
  {
    id: '2',
    name: 'Truffle Goat Cheese Tartlets',
    description: 'Delicate pastry shells filled with creamy goat cheese and topped with truffle shavings',
    price: 5.25,
    image: truffleTartlets,
    category: 'canapés',
    dietary: ['vegetarian']
  },
  {
    id: '3',
    name: 'Prosciutto Asparagus',
    description: 'Hand-wrapped asparagus spears with Italian prosciutto and hollandaise drizzle',
    price: 4.75,
    image: prosciuttoAsparagus,
    category: 'canapés',
    dietary: ['gluten-free']
  },
  {
    id: '4',
    name: 'Artisanal Chocolate Truffles',
    description: 'Hand-crafted truffles with gold leaf. Dark chocolate, white chocolate, and champagne varieties',
    price: 6.50,
    image: chocolateTruffles,
    category: 'treats',
    dietary: ['vegetarian', 'gluten-free']
  }
];

const MenuSection = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'canapés', name: 'Canapés' },
    { id: 'platters', name: 'Platters' },
    { id: 'treats', name: 'Treats' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="py-20 subtle-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-elegant font-light mb-6 text-primary heading-elegant">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted canapés and treats, each one a work of art
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-smooth hover-lift"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover-lift border-0 shadow-soft bg-card">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-smooth hover:scale-105"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.dietary.map((diet) => (
                    <Badge key={diet} variant="secondary" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>
                
                <CardTitle className="text-lg font-medium mb-2 text-primary">
                  {item.name}
                </CardTitle>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <div className="text-2xl font-light text-accent">
                  £{item.price.toFixed(2)}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full hover-gold transition-smooth"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;