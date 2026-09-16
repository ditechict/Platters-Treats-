import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Basket">
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={closeCart} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-elegant flex flex-col">
        <div className="flex items-center justify-between px-6 h-20 border-b border-border">
          <h2 className="font-display text-2xl font-light text-primary heading-elegant">Your Basket</h2>
          <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close basket">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground font-light">
              Your basket is empty — discover our canapés and platters.
            </p>
            <Button asChild onClick={closeCart} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/menu">Browse the Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h3 className="text-sm font-medium text-primary truncate">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-muted-foreground hover:text-destructive transition-smooth"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border">
                        <button
                          className="px-2 py-1 text-muted-foreground hover:text-primary transition-smooth"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-muted-foreground hover:text-primary transition-smooth"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm text-accent font-medium">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl text-primary">£{getTotalPrice().toFixed(2)}</span>
              </div>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold" onClick={closeCart}>
                <Link to="/cart">Review Basket &amp; Checkout</Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={closeCart}>
                Continue Browsing
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
