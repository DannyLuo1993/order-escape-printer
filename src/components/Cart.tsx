
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu as MenuIcon, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { cartItems, cartTotal, itemCount, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };
  
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden">
        <div className="container p-4 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 mx-4"
            onClick={toggleCart}
          >
            <div className="flex items-center justify-between w-full">
              <span>View Order</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-restaurant-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {itemCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Button>
          
          <Button 
            className="bg-restaurant-primary hover:bg-restaurant-primary/90"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Desktop cart button */}
      <div className="fixed top-4 right-4 z-50 hidden md:block">
        <Button 
          className="bg-restaurant-primary hover:bg-restaurant-primary/90 rounded-full h-14 w-14 relative"
          onClick={toggleCart}
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-restaurant-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
      
      {/* Cart sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">Your Order</SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground mt-2">Add items from the menu to get started</p>
              <Button 
                className="mt-6 bg-restaurant-primary hover:bg-restaurant-primary/90"
                onClick={() => setIsCartOpen(false)}
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    className="bg-restaurant-primary hover:bg-restaurant-primary/90 w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your cart?")) {
                        clearCart();
                      }
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
