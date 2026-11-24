import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveMenu from '@/components/InteractiveMenu';
import { useEffect } from 'react';

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-elegant font-light mb-4 heading-elegant">
              Zeren Menu
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
              Afro-brunch, pancakes, French toast, Full English, matcha, mocktails and coffee.
            </p>
          </div>
        </div>
        <InteractiveMenu />
      </main>
      <Footer />
    </div>
  );
};

export default Menu;