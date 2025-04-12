
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="menu-item-card overflow-hidden h-full cursor-pointer" onClick={onClick}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-0 right-0 p-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white text-restaurant-primary hover:bg-white/90 rounded-full shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item, 1);
            }}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="font-bold text-restaurant-primary">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
