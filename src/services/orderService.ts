
import { Order } from '@/types';

// Mocked server endpoint - In a real application, this would be your actual server URL
const SERVER_API_URL = 'https://api.yourrestaurant.com';

// In a real application, this would call an actual backend API
export const submitOrder = async (order: Order): Promise<{ success: boolean; orderId: string }> => {
  console.log('Submitting order to backend server:', order);
  
  try {
    // For this example, we'll simulate a server response
    // In a real application, you would make an actual API call to your server
    
    // Mock successful response after a short delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate server response
    return {
      success: true,
      orderId: order.id
    };
    
    /* 
    // Real implementation would look something like this:
    const response = await fetch(`${SERVER_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    
    const result = await response.json();
    return result;
    */
  } catch (error) {
    console.error('Error submitting order to server:', error);
    return {
      success: false,
      orderId: order.id
    };
  }
};
