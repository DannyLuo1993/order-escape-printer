
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, CustomerInfo } from '../types';
import { toast } from '@/components/ui/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateNotes: (itemId: string, notes: string) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  customerInfo: CustomerInfo;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  setOrderType: (type: 'delivery' | 'pickup' | 'dine-in') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    tableNumber: ''
  });
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dine-in'>('pickup');

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
    
    const savedCustomerInfo = localStorage.getItem('customerInfo');
    if (savedCustomerInfo) {
      try {
        setCustomerInfo(JSON.parse(savedCustomerInfo));
      } catch (error) {
        console.error('Failed to parse saved customer info:', error);
      }
    }
    
    const savedOrderType = localStorage.getItem('orderType');
    if (savedOrderType) {
      setOrderType(savedOrderType as 'delivery' | 'pickup' | 'dine-in');
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save customer info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
  }, [customerInfo]);
  
  // Save order type to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orderType', orderType);
  }, [orderType]);

  const addToCart = (item: MenuItem, quantity = 1, notes = '') => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item already exists in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          notes: notes || updatedItems[existingItemIndex].notes
        };
        toast({
          title: "Item updated in cart",
          description: `${item.name} quantity updated to ${updatedItems[existingItemIndex].quantity}`,
          duration: 2000
        });
        return updatedItems;
      } else {
        // Add new item to cart
        toast({
          title: "Item added to cart",
          description: `${item.name} added to your order`,
          duration: 2000
        });
        return [...prevItems, { ...item, quantity, notes }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from your order`,
          duration: 2000
        });
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (itemId: string, notes: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, notes } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
    setCustomerInfo(prev => ({ ...prev, ...info }));
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  // Calculate total item count
  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateNotes,
      clearCart,
      cartTotal,
      itemCount,
      customerInfo,
      updateCustomerInfo,
      orderType,
      setOrderType
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
