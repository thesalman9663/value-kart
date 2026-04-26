import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/useBackend";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PaymentMethod = "UPI" | "COD";

interface FormState {
  name: string;
  phone: string;
  address: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

// Razorpay type shim
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; contact: string; email?: string };
  theme: { color: string };
  handler: (response: { razorpay_payment_id: string }) => void;
  modal: { ondismiss: () => void };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("COD");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.match(/^[6-9]\d{9}$/))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.address.trim() || form.address.length < 10)
      e.address = "Enter complete delivery address (min 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCODOrder = async () => {
    if (items.length === 0) return;
    const item = items[0];
    try {
      const order = await createOrder.mutateAsync({
        customerName: form.name,
        customerPhone: form.phone,
        customerAddress: form.address,
        customerEmail: form.email || undefined,
        productId: item.productId,
        productName: item.productName,
        productPrice: item.price,
        productSize: item.size,
        productColor: item.color,
        quantity: item.quantity,
        paymentMethod: "COD",
      });
      clearCart();
      void navigate({
        to: "/order-confirmation",
        search: { orderId: order.id },
      });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleUPIOrder = async () => {
    if (items.length === 0) return;
    const item = items[0];
    // Step 1: Create backend order first to get an orderId
    const order = await createOrder.mutateAsync({
      customerName: form.name,
      customerPhone: form.phone,
      customerAddress: form.address,
      customerEmail: form.email || undefined,
      productId: item.productId,
      productName: item.productName,
      productPrice: item.price,
      productSize: item.size,
      productColor: item.color,
      quantity: item.quantity,
      paymentMethod: "UPI",
    });

    // Step 2: Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      return;
    }

    // Step 3: Open Razorpay modal
    // amount is in paise (multiply by 100)
    const rzpOptions: RazorpayOptions = {
      key: "rzp_test_placeholder",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Value Kart",
      description: "₹100 Cashback on Delivery",
      order_id: order.id,
      prefill: {
        name: form.name,
        contact: form.phone,
        email: form.email || undefined,
      },
      theme: { color: "#22c55e" },
      handler: (response) => {
        // Payment successful
        clearCart();
        void navigate({
          to: "/order-confirmation",
          search: {
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          toast.error("Payment cancelled. Your order was not placed.");
        },
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsProcessing(true);
    try {
      if (payment === "COD") {
        await handleCODOrder();
      } else {
        await handleUPIOrder();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const isPending = createOrder.isPending || isProcessing;

  if (items.length === 0) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center"
        data-ocid="checkout.empty_state"
      >
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Add products to your cart before checking out.
        </p>
        <Link to="/products">
          <Button className="bg-primary text-primary-foreground">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" data-ocid="checkout.page">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-5 transition-colors"
        data-ocid="checkout.back_link"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Delivery Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    onBlur={() => {
                      if (!form.name.trim())
                        setErrors((ev) => ({
                          ...ev,
                          name: "Name is required",
                        }));
                      else setErrors((ev) => ({ ...ev, name: undefined }));
                    }}
                    className={`mt-1 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    data-ocid="checkout.name_input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="checkout.name_field_error"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Mobile Number *
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                      onBlur={() => {
                        if (!form.phone.match(/^[6-9]\d{9}$/))
                          setErrors((ev) => ({
                            ...ev,
                            phone: "Enter a valid 10-digit mobile number",
                          }));
                        else setErrors((ev) => ({ ...ev, phone: undefined }));
                      }}
                      className={`pl-12 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      data-ocid="checkout.phone_input"
                    />
                  </div>
                  {errors.phone && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="checkout.phone_field_error"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address" className="text-sm font-medium">
                    Delivery Address *
                  </Label>
                  <textarea
                    id="address"
                    placeholder="House no., Street, Area, City, State, PIN code"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    onBlur={() => {
                      if (!form.address.trim() || form.address.length < 10)
                        setErrors((ev) => ({
                          ...ev,
                          address:
                            "Enter complete delivery address (min 10 characters)",
                        }));
                      else setErrors((ev) => ({ ...ev, address: undefined }));
                    }}
                    rows={3}
                    className={`mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none ${errors.address ? "border-destructive focus:ring-destructive" : "border-input"}`}
                    data-ocid="checkout.address_textarea"
                  />
                  {errors.address && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="checkout.address_field_error"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Email (optional) */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="checkout.email_input"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* COD option */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    payment === "COD"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  data-ocid="checkout.cod_radio"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={payment === "COD"}
                    onChange={() => setPayment("COD")}
                    className="accent-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0 text-xs flex-shrink-0">
                    Recommended
                  </Badge>
                </label>

                {/* UPI option */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    payment === "UPI"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  data-ocid="checkout.upi_radio"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={payment === "UPI"}
                    onChange={() => setPayment("UPI")}
                    className="accent-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">
                      UPI Payment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Google Pay, PhonePe, Paytm & all UPI apps
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium text-foreground">
                      GPay
                    </span>
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium text-foreground">
                      PhonePe
                    </span>
                  </div>
                </label>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold text-base shadow-sm"
              disabled={isPending}
              data-ocid="checkout.submit_button"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"
                    data-ocid="checkout.loading_state"
                  />
                  {payment === "UPI"
                    ? "Opening Payment..."
                    : "Placing Order..."}
                </span>
              ) : (
                `Place Order — ₹${totalAmount}`
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              💰 ₹100 cashback will be credited within 7 days of delivery
            </p>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Items list */}
              <div
                className="space-y-3 mb-4"
                data-ocid="checkout.order_summary"
              >
                {items.length === 0 ? (
                  <div className="space-y-2" data-ocid="checkout.items_loading">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                ) : (
                  items.map((item, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: cart items indexed positionally
                      key={i}
                      className="flex gap-3 text-sm"
                      data-ocid={`checkout.item.${i + 1}`}
                    >
                      <img
                        src={item.imageUrl || "/assets/images/placeholder.svg"}
                        alt={item.productName}
                        className="w-14 h-14 rounded-lg object-cover bg-muted flex-shrink-0 border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/placeholder.svg";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground line-clamp-2 leading-tight">
                          {item.productName}
                        </p>
                        <div className="flex gap-2 mt-0.5">
                          {item.size && (
                            <span className="text-xs text-muted-foreground">
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="text-xs text-muted-foreground">
                              · {item.color}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground flex-shrink-0">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <Separator className="my-3" />

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Subtotal ({items.length} item{items.length > 1 ? "s" : ""})
                  </span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-primary font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-primary text-xs font-medium">
                  <span>Cashback (after delivery)</span>
                  <span>-₹100</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-bold text-foreground text-base">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              {/* Effective price note */}
              <p className="text-xs text-muted-foreground mt-2 text-center bg-primary/5 rounded-md px-2 py-1.5">
                Effective price after cashback:{" "}
                <span className="font-semibold text-primary">
                  ₹{Math.max(0, totalAmount - 100)}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
