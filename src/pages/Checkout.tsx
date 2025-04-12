
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import CartItem from '@/components/CartItem';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@/types';
import { submitOrder, sendPrintRequest } from '@/services/orderService';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart, customerInfo, updateCustomerInfo, orderType, setOrderType } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate customer info
    if (!customerInfo.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (!customerInfo.phone.trim()) {
      toast({
        title: "Phone required",
        description: "Please enter your phone number to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (orderType === 'delivery' && !customerInfo.address?.trim()) {
      toast({
        title: "Address required",
        description: "Please enter your delivery address to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (orderType === 'dine-in' && !customerInfo.tableNumber?.trim()) {
      toast({
        title: "Table number required",
        description: "Please enter your table number to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create order object
      const order: Order = {
        id: uuidv4().substring(0, 8).toUpperCase(),
        items: cartItems,
        customer: customerInfo,
        total: cartTotal,
        orderType,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Submit order to server
      const result = await submitOrder(order);
      
      if (result.success) {
        // If order submission is successful, send a fixed "Hello World" print request to server
        const printResult = await sendPrintRequest();
        
        if (printResult) {
          // If printing is successful
          toast({
            title: "Order submitted successfully!",
            description: `Your order #${order.id} has been sent to the kitchen and a test receipt has been printed.`,
          });
        } else {
          // If printing fails but order was submitted
          toast({
            title: "Order submitted successfully!",
            description: `Your order #${order.id} has been sent to the kitchen, but there was an issue with printing the test receipt.`,
          });
        }
        
        // Clear cart
        clearCart();
        
        // Navigate to confirmation page
        navigate('/confirmation', { state: { order } });
      } else {
        // Error with order submission
        toast({
          title: "Order processing error",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error processing order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some items to your cart before checking out.</p>
          <Button 
            className="mt-4 bg-restaurant-primary hover:bg-restaurant-primary/90"
            onClick={() => navigate('/')}
          >
            Return to Menu
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Menu
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid gap-8 md:grid-cols-1">
        <div>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto" 
                  onClick={() => setIsCartExpanded(!isCartExpanded)}
                >
                  {isCartExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              {isCartExpanded ? (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                  <Separator />
                </div>
              ) : (
                <div className="text-sm text-muted-foreground mb-4">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
                </div>
              )}
              
              <div className="flex justify-between text-lg font-semibold mt-4">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Order Type</h2>
                    <RadioGroup 
                      value={orderType} 
                      onValueChange={(value) => setOrderType(value as 'delivery' | 'pickup' | 'dine-in')}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">Pickup</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery">Delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dine-in" id="dine-in" />
                        <Label htmlFor="dine-in">Dine-in</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={customerInfo.name} 
                          onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={customerInfo.phone} 
                          onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      
                      {orderType === 'delivery' && (
                        <div className="grid gap-2">
                          <Label htmlFor="address">Delivery Address</Label>
                          <Input 
                            id="address" 
                            value={customerInfo.address} 
                            onChange={(e) => updateCustomerInfo({ address: e.target.value })}
                            placeholder="Enter your delivery address"
                            required
                          />
                        </div>
                      )}
                      
                      {orderType === 'dine-in' && (
                        <div className="grid gap-2">
                          <Label htmlFor="tableNumber">Table Number</Label>
                          <Input 
                            id="tableNumber" 
                            value={customerInfo.tableNumber} 
                            onChange={(e) => updateCustomerInfo({ tableNumber: e.target.value })}
                            placeholder="Enter your table number"
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
