import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleCheckout = () => {
    toast.success('Checkout functionality coming soon! Please contact us to complete your order.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <Card className="max-w-md mx-auto text-center border-0 shadow-elegant">
              <CardContent className="p-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-elegant font-light mb-4 text-primary">
                  Your Cart is Empty
                </h2>
                <p className="text-muted-foreground mb-8">
                  Discover our exquisite canapés and artisanal treats
                </p>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/menu">Browse Menu</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <div className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-elegant font-light mb-4 heading-elegant">
              Your Cart
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Review your selection of fine canapés and treats
            </p>
          </div>
        </div>

        {/* Cart Content */}
        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-primary">
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xl font-light text-accent">
                              £{item.price.toFixed(2)}
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              
                              <span className="text-lg font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-elegant sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl font-elegant font-light text-primary">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-primary">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center text-lg font-medium">
                        <span className="text-primary">Total</span>
                        <span className="text-accent text-xl">
                          £{getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        onClick={handleCheckout}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold"
                      >
                        Proceed to Checkout
                      </Button>
                      
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/menu">Continue Shopping</Link>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={clearCart}
                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart;