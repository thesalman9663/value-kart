import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    name: string;
    description: string;
    commission: bigint;
    sizes: Array<string>;
    imageUrl: string;
    category: string;
    colors: Array<string>;
    price: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderInput {
    customerName: string;
    paymentMethod: PaymentMethod;
    customerPhone: string;
    productColor: string;
    productId: ProductId;
    productName: string;
    productSize: string;
    customerAddress: string;
    razorpayOrderId?: string;
    quantity: bigint;
    customerEmail?: string;
    productPrice: bigint;
}
export interface Order {
    id: OrderId;
    razorpayPaymentId?: string;
    customerName: string;
    deliveryTimestamp?: Timestamp;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    customerPhone: string;
    orderStatus: OrderStatus;
    cashbackTimestamp?: Timestamp;
    createdAt: Timestamp;
    productColor: string;
    productId: ProductId;
    productName: string;
    productSize: string;
    customerAddress: string;
    razorpayOrderId?: string;
    quantity: bigint;
    customerEmail?: string;
    cashbackStatus: CashbackStatus;
    productPrice: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type SessionToken = string;
export type ProductId = bigint;
export type LoginResult = {
    __kind__: "ok";
    ok: SessionToken;
} | {
    __kind__: "err";
    err: string;
};
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    commission: bigint;
    sizes: Array<string>;
    imageUrl: string;
    category: string;
    colors: Array<string>;
    price: bigint;
}
export type OrderId = bigint;
export enum CashbackStatus {
    pending = "pending",
    given = "given"
}
export enum OrderStatus {
    shipped = "shipped",
    placed = "placed",
    delivered = "delivered",
    processing = "processing"
}
export enum PaymentMethod {
    COD = "COD",
    UPI = "UPI"
}
export enum PaymentStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Product>;
    adminLogin(username: string, password: string): Promise<LoginResult>;
    adminLogout(token: string): Promise<void>;
    createOrder(input: OrderInput): Promise<bigint>;
    createRazorpayOrder(amount: bigint, orderId: bigint): Promise<string>;
    deleteProduct(id: bigint): Promise<boolean>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getProduct(id: bigint): Promise<Product | null>;
    getTotalOrders(): Promise<bigint>;
    getTotalProducts(): Promise<bigint>;
    listOrders(): Promise<Array<Order>>;
    listProducts(): Promise<Array<Product>>;
    markCashbackGiven(orderId: bigint): Promise<Order | null>;
    markDelivered(orderId: bigint): Promise<Order | null>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderPaymentStatus(orderId: bigint, status: PaymentStatus, razorpayPaymentId: string | null): Promise<Order | null>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: bigint, input: ProductInput): Promise<Product | null>;
    validateAdminSession(token: string): Promise<boolean>;
    verifyRazorpayPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): Promise<boolean>;
}
