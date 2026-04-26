export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  colors: string[];
  description: string;
  category: string;
  commission: number;
  createdAt: number;
}

export interface ProductInput {
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  colors: string[];
  description: string;
  category: string;
  commission: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  quantity: number;
}

// Flat single-product order matching backend schema
export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productSize: string;
  productColor: string;
  quantity: number;
  paymentMethod: "UPI" | "COD";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  cashbackStatus: "pending" | "given";
  deliveredAt?: number;
  createdAt: number;
}

export interface OrderInput {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productSize: string;
  productColor: string;
  quantity: number;
  paymentMethod: "UPI" | "COD";
}

export interface AdminLoginResult {
  success: boolean;
  token: string;
  message: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}
