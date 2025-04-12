
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import MenuItemCard from './MenuItemCard';
import { categories, menuItems } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types';

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setNotes('');
    setDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity, notes);
      setDialogOpen(false);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 flex flex-wrap justify-start gap-2">
          <TabsTrigger value="all" className="bg-white">All Items</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="bg-white">{category.name}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map(item => (
              <MenuItemCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
            ))}
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter(item => item.category === category.id)
                .map(item => (
                  <MenuItemCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Item detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>{selectedItem?.description}</DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4">
              <div className="h-56 overflow-hidden rounded-md">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">${selectedItem.price.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special requests or allergies..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleAddToCart} className="bg-restaurant-primary hover:bg-restaurant-primary/90">
                  Add to Order - ${(selectedItem.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
