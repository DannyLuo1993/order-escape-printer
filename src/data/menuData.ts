
import { MenuItem, Category } from '../types';

export const categories: Category[] = [
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'main-courses', name: 'Main Courses' },
  { id: 'sides', name: 'Side Dishes' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
];

export const menuItems: MenuItem[] = [
  {
    id: 'app1',
    name: 'Crispy Spring Rolls',
    description: 'Vegetable filled spring rolls with sweet chili sauce',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1606674556490-c2bbb4ee05e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'appetizers'
  },
  {
    id: 'app2',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter and herbs',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1573140401455-cbc932ef6dbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'appetizers'
  },
  {
    id: 'app3',
    name: 'Buffalo Wings',
    description: 'Spicy chicken wings with blue cheese dip',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1608039755872-cde16161d05f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'appetizers'
  },
  {
    id: 'main1',
    name: 'Classic Burger',
    description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'main-courses'
  },
  {
    id: 'main2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604917877934-07d8d248d381?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'main-courses'
  },
  {
    id: 'main3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'main-courses'
  },
  {
    id: 'main4',
    name: 'Chicken Alfredo',
    description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1645112551608-e2c830f7ab14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'main-courses'
  },
  {
    id: 'side1',
    name: 'French Fries',
    description: 'Crispy potato fries with sea salt',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'sides'
  },
  {
    id: 'side2',
    name: 'Mac & Cheese',
    description: 'Creamy macaroni and cheese',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'sides'
  },
  {
    id: 'dessert1',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache frosting',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  },
  {
    id: 'dessert2',
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  },
  {
    id: 'drink1',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with mint',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'drinks'
  },
  {
    id: 'drink2',
    name: 'Iced Tea',
    description: 'House-brewed iced tea with lemon',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1597403491447-3ab08a1fb420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'drinks'
  }
];
