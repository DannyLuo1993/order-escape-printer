
import CryptoJS from 'crypto-js';
import { Order } from '@/types';

// XPrinter API configuration
const API_BASE_URL = 'https://open.xpyun.net/api/openapi/xprinter';
const USER = 'support2@xprinter.net';
const API_KEY = '0cf6d89114ff418bb7f53bdfa653393f';
const SN = '558M900P7BC5A49'; // Test printer SN number

// Helper function to generate timestamp
const getTimestamp = (): string => {
  return Math.floor(Date.now() / 1000).toString();
};

// Helper function to generate signature
const generateSignature = (timestamp: string): string => {
  const signStr = USER + API_KEY + timestamp;
  return CryptoJS.MD5(signStr).toString();
};

// Function to print order receipt
export const printOrder = async (orderContent: string): Promise<boolean> => {
  try {
    const timestamp = getTimestamp();
    const signature = generateSignature(timestamp);
    
    const requestData = {
      user: USER,
      timestamp,
      sign: signature,
      sn: SN,
      content: orderContent,
      copies: 1,
      voice: true // Enable voice reminder on printer
    };
    
    const response = await fetch(`${API_BASE_URL}/print`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const result = await response.json();
    
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

// Function to format order as a printable receipt
export const formatOrderForPrinting = (order: Order): string => {
  let receipt = '';
  
  // Add header
  receipt += '<CB>RESTAURANT ORDER</CB>\n\n';
  receipt += '<C>--------------------------------</C>\n';
  
  // Add order number and date
  receipt += `<B>Order #:</B> ${order.id}\n`;
  receipt += `<B>Date:</B> ${new Date().toLocaleString()}\n`;
  receipt += `<B>Type:</B> ${order.orderType.toUpperCase()}\n\n`;
  
  // Add customer details
  receipt += '<B>CUSTOMER DETAILS:</B>\n';
  receipt += `Name: ${order.customer.name}\n`;
  receipt += `Phone: ${order.customer.phone}\n`;
  
  if (order.orderType === 'delivery' && order.customer.address) {
    receipt += `Address: ${order.customer.address}\n`;
  } else if (order.orderType === 'dine-in' && order.customer.tableNumber) {
    receipt += `Table #: ${order.customer.tableNumber}\n`;
  }
  
  receipt += '<C>--------------------------------</C>\n';
  
  // Add order items
  receipt += '<B>ITEMS:</B>\n\n';
  
  order.items.forEach((item, index) => {
    receipt += `${index + 1}. ${item.name} x${item.quantity}\n`;
    receipt += `   $${(item.price * item.quantity).toFixed(2)}\n`;
    if (item.notes) {
      receipt += `   Note: ${item.notes}\n`;
    }
    receipt += '\n';
  });
  
  receipt += '<C>--------------------------------</C>\n';
  
  // Add total
  receipt += `<RIGHT><B>TOTAL: $${order.total.toFixed(2)}</B></RIGHT>\n\n`;
  
  // Add footer
  receipt += '<C>Thank you for your order!</C>\n';
  receipt += '<C>We hope you enjoy your meal.</C>\n';
  
  return receipt;
};

// Function to check printer status
export const checkPrinterStatus = async (): Promise<boolean> => {
  try {
    const timestamp = getTimestamp();
    const signature = generateSignature(timestamp);
    
    const requestData = {
      user: USER,
      timestamp,
      sign: signature,
      sn: SN
    };
    
    const response = await fetch(`${API_BASE_URL}/queryPrinterStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const result = await response.json();
    
    if (result.code === 0) {
      console.log('Printer status:', result);
      return result.data.status === 1; // 1 means online
    } else {
      console.error('Failed to check printer status', result);
      return false;
    }
  } catch (error) {
    console.error('Error checking printer status:', error);
    return false;
  }
};
