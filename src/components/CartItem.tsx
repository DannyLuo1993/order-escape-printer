
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, updateNotes, removeFromCart } = useCart();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');
  
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };
  
  const handleSaveNotes = () => {
    updateNotes(item.id, notes);
    setIsEditingNotes(false);
  };
  
  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
          
          {!isEditingNotes && item.notes && (
            <p className="text-sm mt-2 text-muted-foreground">
              Note: {item.notes}
            </p>
          )}
          
          {isEditingNotes ? (
            <div className="mt-2 space-y-2">
              <Textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add special instructions..."
                className="text-sm h-20"
              />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveNotes} className="bg-restaurant-primary hover:bg-restaurant-primary/90">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              variant="link" 
              className="p-0 h-auto text-restaurant-primary"
              onClick={() => setIsEditingNotes(true)}
            >
              {item.notes ? 'Edit' : 'Add'} special instructions
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="h-8 w-12 text-center mx-1"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </Button>
          </div>
          
          <div className="w-16 text-right font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive" 
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
