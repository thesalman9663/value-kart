import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrder } from "@/hooks/useBackend";
import {
  buildOrderConfirmationMessage,
  buildWhatsAppUrl,
} from "@/utils/whatsapp";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";

export default function OrderConfirmationPage() {
  const search = useSearch({ strict: false }) as { orderId?: string };
  const orderId = search.orderId ?? "";
  const { data: order, isLoading } = useOrder(orderId);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[50vh]"
        data-ocid="order_confirmation.loading_state"
      >
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4"
        data-ocid="order_confirmation.error_state"
      >
        <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-40" />
        <h2 className="text-xl font-display font-semibold text-foreground">
          Order not found
        </h2>
        <p className="text-muted-foreground text-sm text-center">
          We couldn't find this order. Please contact support via WhatsApp.
        </p>
        <Link to="/products">
          <Button data-ocid="order_confirmation.back_button">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  const orderTotal = order.productPrice * order.quantity;
  const waMessage = buildOrderConfirmationMessage(
    order.id,
    order.customerName,
    orderTotal,
  );
  const waUrl = buildWhatsAppUrl(waMessage);

  return (
    <div
      className="max-w-lg mx-auto px-4 py-8"
      data-ocid="order_confirmation.page"
    >
      {/* Success header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">
          Order Placed Successfully!
        </h1>
        <p className="text-muted-foreground text-sm mb-2">
          Thank you for shopping with Value Kart 🎉
        </p>
        <span className="text-xs font-mono bg-muted text-muted-foreground px-3 py-1 rounded-full">
          Order ID: {order.id}
        </span>
      </div>

      {/* Cashback highlight */}
      <Card
        className="mb-4 border-primary/30 bg-primary/5"
        data-ocid="order_confirmation.cashback_card"
      >
        <CardContent className="p-4 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💰</span>
          <div>
            <p className="font-semibold text-foreground text-sm">
              ₹100 Cashback Guaranteed!
            </p>
            <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
              Your ₹100 cashback will be credited to your UPI within 7 days
              after delivery confirmation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order details card */}
      <Card className="mb-4" data-ocid="order_confirmation.order_details_card">
        <CardContent className="p-4 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Order Details
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {order.customerName}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">
                  {order.customerPhone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  Delivery Address
                </p>
                <p className="text-sm font-medium text-foreground break-words">
                  {order.customerAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Product ordered */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Item Ordered
            </p>
            <div
              className="flex items-center justify-between gap-2 bg-muted/40 rounded-md px-3 py-2"
              data-ocid="order_confirmation.item.1"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {order.productName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {[
                    order.productSize && `Size: ${order.productSize}`,
                    order.productColor && `Color: ${order.productColor}`,
                    `Qty: ${order.quantity}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <p className="text-sm font-semibold text-foreground flex-shrink-0">
                ₹{orderTotal}
              </p>
            </div>
          </div>

          {/* Total & payment */}
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Payment Method</p>
              <p className="text-sm font-medium text-foreground">
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "UPI Payment"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="text-xl font-display font-bold text-primary">
                ₹{orderTotal}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white border-0"
            data-ocid="order_confirmation.whatsapp_button"
          >
            <MessageCircle className="w-4 h-4" />
            Send WhatsApp Confirmation
          </Button>
        </a>
        <Link to="/products" className="block">
          <Button
            variant="outline"
            className="w-full gap-2"
            data-ocid="order_confirmation.continue_shopping_button"
          >
            <Package className="w-4 h-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
