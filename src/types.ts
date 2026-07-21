export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  discountPrice?: number;
  preparationTime: number; // in minutes
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered';
  createdAt: string;
  estimatedDeliveryTime: string; // e.g. "35 mins"
  location?: {
    lat: number;
    lng: number;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}
