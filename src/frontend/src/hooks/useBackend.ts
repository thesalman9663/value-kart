import type {
  AdminLoginResult,
  Order,
  OrderInput,
  Product,
  ProductInput,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Seed products — shown when backend returns no data
// ---------------------------------------------------------------------------
const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Titan Edge Slim Watch",
    imageUrl: "/assets/generated/product-watch.dim_400x400.jpg",
    price: 1299,
    originalPrice: 1999,
    sizes: ["Free Size"],
    colors: ["Silver", "Black", "Gold"],
    description:
      "Ultra-slim quartz watch with stainless steel strap. Perfect for everyday wear.",
    category: "Watches",
    commission: 300,
    createdAt: Date.now(),
  },
  {
    id: "p2",
    name: "SportFlex Running Shoes",
    imageUrl: "/assets/generated/product-shoes.dim_400x400.jpg",
    price: 799,
    originalPrice: 1499,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White/Blue", "Black/Red", "Grey"],
    description:
      "Lightweight mesh upper with cushioned sole for maximum comfort during runs.",
    category: "Shoes",
    commission: 200,
    createdAt: Date.now(),
  },
  {
    id: "p3",
    name: "boAt Bassheads 100 Earphones",
    imageUrl: "/assets/generated/product-earphones.dim_400x400.jpg",
    price: 499,
    originalPrice: 999,
    sizes: ["Free Size"],
    colors: ["Black", "Blue", "Red"],
    description:
      "High-definition sound with powerful bass, inline mic, and tangle-free cable.",
    category: "Gadgets",
    commission: 150,
    createdAt: Date.now(),
  },
  {
    id: "p4",
    name: "Men's Casual Cotton T-Shirt",
    imageUrl: "/assets/generated/product-tshirt.dim_400x400.jpg",
    price: 349,
    originalPrice: 699,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy", "Black", "Olive"],
    description: "100% cotton, breathable fabric. Ideal for daily casual wear.",
    category: "Clothes",
    commission: 100,
    createdAt: Date.now(),
  },
  {
    id: "p5",
    name: "Smart Band Pro Fitness Tracker",
    imageUrl: "/assets/generated/product-smartband.dim_400x400.jpg",
    price: 899,
    originalPrice: 1799,
    sizes: ["Free Size"],
    colors: ["Black", "Blue"],
    description:
      "Track steps, heart rate, sleep, and calories. Compatible with iOS & Android.",
    category: "Gadgets",
    commission: 250,
    createdAt: Date.now(),
  },
  {
    id: "p6",
    name: "Women's Ethnic Kurta Set",
    imageUrl: "/assets/generated/product-kurta.dim_400x400.jpg",
    price: 649,
    originalPrice: 1299,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "Yellow", "Blue", "Green"],
    description:
      "Elegant printed cotton kurta with matching palazzo. Festive & casual ready.",
    category: "Clothes",
    commission: 180,
    createdAt: Date.now(),
  },
];

// ---------------------------------------------------------------------------
// In-memory store (used when backend actor is unavailable / not yet deployed)
// ---------------------------------------------------------------------------
let localProducts: Product[] = [...SEED_PRODUCTS];
let localOrders: Order[] = [];

// ---------------------------------------------------------------------------
// Product hooks
// ---------------------------------------------------------------------------
export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => localProducts,
    staleTime: 30_000,
  });
}

export function useProduct(id: string) {
  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: async () => localProducts.find((p) => p.id === id),
    enabled: !!id,
  });
}

export function useFeaturedProducts(limit = 6) {
  return useQuery<Product[]>({
    queryKey: ["products", "featured", limit],
    queryFn: async () => localProducts.slice(0, limit),
    staleTime: 30_000,
  });
}

export function useAddProduct() {
  const qc = useQueryClient();
  return useMutation<Product, Error, ProductInput>({
    mutationFn: async (input) => {
      const product: Product = {
        id: `p${Date.now()}`,
        ...input,
        createdAt: Date.now(),
      };
      localProducts = [product, ...localProducts];
      return product;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation<
    Product,
    Error,
    { id: string; input: Partial<ProductInput> }
  >({
    mutationFn: async ({ id, input }) => {
      const idx = localProducts.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Product not found");
      localProducts[idx] = { ...localProducts[idx], ...input };
      return localProducts[idx];
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product", id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      localProducts = localProducts.filter((p) => p.id !== id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ---------------------------------------------------------------------------
// Order hooks — flat single-product schema
// ---------------------------------------------------------------------------
export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation<Order, Error, OrderInput>({
    mutationFn: async (input) => {
      const order: Order = {
        id: `ORD${Date.now()}`,
        ...input,
        paymentStatus: "pending",
        orderStatus: "placed",
        cashbackStatus: "pending",
        createdAt: Date.now(),
      };
      localOrders = [order, ...localOrders];
      return order;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => localOrders,
    staleTime: 10_000,
  });
}

export function useOrder(id: string) {
  return useQuery<Order | undefined>({
    queryKey: ["order", id],
    queryFn: async () => localOrders.find((o) => o.id === id),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: string; status: Order["orderStatus"] }>(
    {
      mutationFn: async ({ id, status }) => {
        const idx = localOrders.findIndex((o) => o.id === id);
        if (idx === -1) throw new Error("Order not found");
        localOrders[idx] = {
          ...localOrders[idx],
          orderStatus: status,
          ...(status === "delivered" ? { deliveredAt: Date.now() } : {}),
        };
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
    },
  );
}

export function useMarkCashbackGiven() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const idx = localOrders.findIndex((o) => o.id === id);
      if (idx === -1) throw new Error("Order not found");
      localOrders[idx] = { ...localOrders[idx], cashbackStatus: "given" };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

// ---------------------------------------------------------------------------
// Admin auth hooks — credentials verified by backend actor only
// ---------------------------------------------------------------------------
export function useAdminLogin() {
  return useMutation<
    AdminLoginResult,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      // Credentials are NEVER checked in frontend code.
      // This stub simulates a backend call for local development.
      // In production the real actor.adminLogin(username, password) call
      // returns a Result<SessionToken, Text> — #ok(token) on success,
      // #err(msg) on failure. No credential literals exist in frontend.
      const isLocalDev =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");

      if (!isLocalDev) {
        // Production: always fail gracefully — real auth goes through actor
        throw new Error(
          "Admin login requires backend connection. Please try again.",
        );
      }

      // Local dev stub: return a placeholder token for UI development only.
      // Replace with actor.adminLogin(username, password) once deployed.
      if (username && password) {
        const token = btoa(`session:${Date.now()}`);
        return { success: true, token, message: "Login successful" };
      }
      return { success: false, token: "", message: "Invalid credentials" };
    },
  });
}
