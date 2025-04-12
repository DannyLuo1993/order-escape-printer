
import { Order } from '@/types';
import CryptoJS from 'crypto-js';

// Server API URL - In a real application, this would be your actual server URL
const SERVER_API_URL = 'https://api.yourrestaurant.com';

// XPrinter API configuration
const XPRINTER_API_URL = 'https://open.xpyun.net/api/openapi/xprinter';
const USER = 'support2@xprinter.net'; // Replace with your actual XPrinter user/developer ID
const API_KEY = '0cf6d89114ff418bb7f53bdfa653393f'; // Replace with your actual API key
const SN = '558M900P7BC5A49'; // Replace with your actual printer SN number

// Helper function to generate timestamp
const getTimestamp = (): string => {
  return Math.floor(Date.now() / 1000).toString();
};

// Helper function to generate signature
const generateSignature = (timestamp: string): string => {
  const signStr = USER + API_KEY + timestamp;
  return CryptoJS.SHA1(signStr).toString();
};

// Function to submit order to the backend
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

// Function to print a simple "Hello World" receipt
export const sendPrintRequest = async (): Promise<boolean> => {
  console.log('Sending print request to server');
  
  try {
    // Use a fixed "Hello World" content for printing
    const printContent = formatHelloWorldReceipt();
    
    // In a real application, this would be sent to your server
    // which would then call the XPrinter API
    // For this example, we'll call the XPrinter API directly (simulating server-side code)
    
    const timestamp = getTimestamp();
    const signature = generateSignature(timestamp);
    
    const requestData = {
      user: USER,
      timestamp,
      sign: signature,
      sn: SN,
      content: printContent,
      copies: 1,
      voice: true
    };
    
    console.log('XPrinter API request data:', requestData);
    
    // In a real implementation, this would be done server-side
    // This is just for demonstration
    const response = await fetch(XPRINTER_API_URL + '/print', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const result = await response.json();
    console.log('XPrinter API response:', result);
    
    // Check if print job was successful
    if (result.code === 0) {
      console.log('Print job sent successfully', result);
      return true;
    } else {
      console.error('Failed to send print job', result);
      return false;
    }
  } catch (error) {
    console.error('Error printing order:', error);
    return false;
  }
};

// Function to format a fixed "Hello World" receipt
const formatHelloWorldReceipt = (): string => {
  let receipt = '';
  
  // Add header
  receipt += '<CB>RESTAURANT ORDER</CB>\n\n';
  receipt += '<C>--------------------------------</C>\n';
  
  // Add order details
  receipt += `<B>Date:</B> ${new Date().toLocaleString()}\n\n`;
  
  // Add Hello World message
  receipt += '<C>--------------------------------</C>\n';
  receipt += '<CB>Hello World!</CB>\n\n';
  receipt += '<C>This is a test receipt</C>\n';
  receipt += '<C>from XPrinter Cloud Printer</C>\n\n';
  
  receipt += '<C>--------------------------------</C>\n';
  
  // Add footer
  receipt += '<C>Thank you for your order!</C>\n';
  receipt += '<C>We hope you enjoy your meal.</C>\n';
  
  return receipt;
};
