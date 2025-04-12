
// NOTE: This is just an example to illustrate server-side implementation
// In a real application, this would be part of your backend codebase (Node.js, Express, etc.)
// and would not be included in the frontend codebase

const CryptoJS = require('crypto-js');

// XPrinter API configuration
const API_BASE_URL = 'https://open.xpyun.net/api/openapi/xprinter';
const USER = 'support2@xprinter.net';
const API_KEY = '0cf6d89114ff418bb7f53bdfa653393f';
const SN = '558M900P7BC5A49'; // Test printer SN number

// Helper function to generate timestamp
const getTimestamp = () => {
  return Math.floor(Date.now() / 1000).toString();
};

// Helper function to generate signature
const generateSignature = (timestamp) => {
  const signStr = USER + API_KEY + timestamp;
  return CryptoJS.MD5(signStr).toString();
};

// Function to format order as a printable receipt
const formatOrderForPrinting = (order) => {
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

// Function to print order receipt
const printOrder = async (orderContent) => {
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

// Server endpoint to handle order submission and printing
exports.handleOrderSubmission = async (req, res) => {
  try {
    const order = req.body;
    
    // Format order for printing
    const printContent = formatOrderForPrinting(order);
    
    // Send to printer
    const printSuccess = await printOrder(printContent);
    
    if (printSuccess) {
      res.status(200).json({
        success: true,
        message: 'Order processed successfully',
        orderId: order.id
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error sending order to printer',
        orderId: order.id
      });
    }
  } catch (error) {
    console.error('Server error processing order:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing order',
      error: error.message
    });
  }
};
