
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  
  return (
    <header className="sticky top-0 bg-white border-b z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-restaurant-primary">
          Delicious Eats
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-restaurant-primary transition-colors">
            Menu
          </Link>
          <Link to="/checkout" className="relative text-foreground hover:text-restaurant-primary transition-colors">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-restaurant-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
