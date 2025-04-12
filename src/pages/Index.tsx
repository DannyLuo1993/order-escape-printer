
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import Cart from '@/components/Cart';
import { CartProvider } from '@/context/CartContext';

const Index: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <CartProvider>
      <div className="min-h-screen bg-restaurant-background">
        <Navbar />
        <main className="pb-24 md:pb-0"> {/* Add padding to bottom for mobile cart bar */}
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-restaurant-primary">Welcome to Delicious Eats</h1>
              <p className="text-muted-foreground">Order delicious food for pickup, delivery, or dine-in.</p>
            </div>
            <Menu />
          </div>
        </main>
        <Cart isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </CartProvider>
  );
};

export default Index;
