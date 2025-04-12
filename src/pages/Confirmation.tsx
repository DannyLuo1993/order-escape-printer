
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  
  // Redirect if no order data
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);
  
  if (!order) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-lg">
      <Card className="text-center">
        <CardContent className="pt-10 pb-6 px-6">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-restaurant-accent" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been sent to the kitchen.
          </p>
          
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium mb-2">Order #{order.id}</h2>
            <p className="text-sm">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-4 text-left">
            <h3 className="font-medium">Order Details</h3>
            <div className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <span>{item.quantity}x </span>
                    <span>{item.name}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">Customer Information</h3>
              <p>{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              {order.orderType === 'delivery' && order.customer.address && (
                <p>{order.customer.address}</p>
              )}
              {order.orderType === 'dine-in' && order.customer.tableNumber && (
                <p>Table: {order.customer.tableNumber}</p>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-8">
          <Button 
            className="bg-restaurant-primary hover:bg-restaurant-primary/90"
            onClick={() => navigate('/')}
          >
            Return to Menu
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Confirmation;
