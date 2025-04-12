
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
  tableNumber?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}
