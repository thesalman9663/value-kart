import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useBackend";
import type { Order } from "@/types";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const ORDER_STATUS_STYLES: Record<Order["orderStatus"], string> = {
  placed: "bg-amber-100 text-amber-700 border-0",
  confirmed: "bg-sky-100 text-sky-700 border-0",
  shipped: "bg-violet-100 text-violet-700 border-0",
  delivered: "bg-primary/10 text-primary border-0",
  cancelled: "bg-destructive/10 text-destructive border-0",
};

const PAYMENT_STATUS_STYLES: Record<Order["paymentStatus"], string> = {
  pending: "bg-amber-100 text-amber-700 border-0",
  paid: "bg-primary/10 text-primary border-0",
  failed: "bg-destructive/10 text-destructive border-0",
};

const CASHBACK_STATUS_STYLES: Record<Order["cashbackStatus"], string> = {
  pending: "bg-muted text-muted-foreground border-0",
  given: "bg-primary/10 text-primary border-0",
};

const STATUS_OPTIONS: Order["orderStatus"][] = [
  "placed",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const { data: orders, isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (
    orderId: string,
    status: Order["orderStatus"],
  ) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      toast.success(`Status updated to "${status}"`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div data-ocid="admin_orders.page">
      <div className="mb-6">
        <h1 className="font-display font-bold text-xl text-foreground">
          Orders
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {orders?.length ?? 0} total orders
        </p>
      </div>

      {isLoading ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin_orders.loading_state"
        >
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading orders...
        </div>
      ) : !orders?.length ? (
        <div className="text-center py-16" data-ocid="admin_orders.empty_state">
          <ShoppingBag className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium text-foreground">No orders yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Orders will appear here once customers place them
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin_orders.list">
          {orders.map((order, i) => (
            <Card key={order.id} data-ocid={`admin_orders.item.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1 space-y-2 min-w-0">
                    {/* Header row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-foreground bg-muted px-2 py-0.5 rounded">
                        {order.id}
                      </span>
                      <Badge className={ORDER_STATUS_STYLES[order.orderStatus]}>
                        {order.orderStatus}
                      </Badge>
                      <Badge
                        className={PAYMENT_STATUS_STYLES[order.paymentStatus]}
                      >
                        {order.paymentStatus}
                      </Badge>
                      <Badge
                        className={CASHBACK_STATUS_STYLES[order.cashbackStatus]}
                      >
                        cashback: {order.cashbackStatus}
                      </Badge>
                    </div>

                    {/* Customer info */}
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.customerPhone}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {order.customerAddress}
                      </p>
                    </div>

                    {/* Order summary */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {order.productName}
                        {order.productSize
                          ? ` · Size: ${order.productSize}`
                          : ""}
                        {order.productColor ? ` · ${order.productColor}` : ""}
                        {` · Qty: ${order.quantity}`}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        ₹{order.productPrice * order.quantity}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {order.paymentMethod}
                      </Badge>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-muted-foreground">
                      Placed:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      {order.deliveredAt &&
                        ` · Delivered: ${new Date(order.deliveredAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row sm:flex-col gap-2 sm:min-w-[150px]">
                    <Select
                      value={order.orderStatus}
                      onValueChange={(v) =>
                        handleStatusChange(order.id, v as Order["orderStatus"])
                      }
                    >
                      <SelectTrigger
                        className="h-8 text-xs flex-1 sm:flex-none"
                        data-ocid={`admin_orders.status_select.${i + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="text-xs capitalize"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {order.orderStatus !== "delivered" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs border-primary text-primary hover:bg-primary/5 flex-1 sm:flex-none"
                        onClick={() =>
                          handleStatusChange(order.id, "delivered")
                        }
                        disabled={updateStatus.isPending}
                        data-ocid={`admin_orders.mark_delivered_button.${i + 1}`}
                      >
                        ✓ Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
