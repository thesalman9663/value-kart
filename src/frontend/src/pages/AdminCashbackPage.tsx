import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarkCashbackGiven, useOrders } from "@/hooks/useBackend";
import type { Order } from "@/types";
import { BadgeDollarSign, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "pending" | "given";

function daysSince(timestamp: number) {
  return Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
}

function isEligible(order: Order): boolean {
  if (order.cashbackStatus === "given") return false;
  if (!order.deliveredAt) return false;
  return daysSince(order.deliveredAt) >= 7;
}

export default function AdminCashbackPage() {
  const { data: orders, isLoading } = useOrders();
  const markCashback = useMarkCashbackGiven();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const deliveredOrders = (orders ?? []).filter(
    (o) => o.orderStatus === "delivered",
  );

  const pendingCount = deliveredOrders.filter(
    (o) => o.cashbackStatus !== "given",
  ).length;
  const eligibleCount = deliveredOrders.filter(isEligible).length;
  const givenCount = deliveredOrders.filter(
    (o) => o.cashbackStatus === "given",
  ).length;

  const filteredOrders = deliveredOrders.filter((o) => {
    if (activeTab === "pending") return o.cashbackStatus !== "given";
    if (activeTab === "given") return o.cashbackStatus === "given";
    return true;
  });

  const handleMarkGiven = async (order: Order) => {
    if (order.cashbackStatus === "given") return;
    if (!isEligible(order)) {
      const days = order.deliveredAt ? daysSince(order.deliveredAt) : 0;
      toast.error(
        `Cashback eligible after 7 days. ${7 - days} day(s) remaining.`,
      );
      return;
    }
    try {
      await markCashback.mutateAsync(order.id);
      toast.success(`₹100 cashback marked as given for ${order.customerName}`);
    } catch {
      toast.error("Failed to update cashback status");
    }
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All Delivered", count: deliveredOrders.length },
    { key: "pending", label: "Pending Cashback", count: pendingCount },
    { key: "given", label: "Cashback Given", count: givenCount },
  ];

  return (
    <div data-ocid="admin_cashback.page">
      <div className="mb-6">
        <h1 className="font-display font-bold text-xl text-foreground">
          Cashback Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track and process ₹100 cashback for delivered orders
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="font-display font-bold text-2xl text-foreground">
              {deliveredOrders.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total Delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="font-display font-bold text-2xl text-amber-600">
              {eligibleCount}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Eligible Now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="font-display font-bold text-2xl text-primary">
              {givenCount}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Given</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 p-1 bg-muted rounded-lg mb-4 w-full"
        data-ocid="admin_cashback.filter_tabs"
      >
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
              activeTab === key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`admin_cashback.filter_${key}_tab`}
          >
            {label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-primary/10 text-primary" : "bg-muted-foreground/20"}`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin_cashback.loading_state"
        >
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div
          className="text-center py-16"
          data-ocid="admin_cashback.empty_state"
        >
          <BadgeDollarSign className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium text-foreground">
            {activeTab === "all"
              ? "No delivered orders yet"
              : activeTab === "pending"
                ? "No pending cashbacks"
                : "No cashbacks given yet"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {activeTab === "all"
              ? "Orders marked as delivered will appear here"
              : ""}
          </p>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              {filteredOrders.length} order
              {filteredOrders.length !== 1 ? "s" : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">
                      Order
                    </th>
                    <th className="text-left p-3 font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                      Delivery
                    </th>
                    <th className="text-center p-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Days Since
                    </th>
                    <th className="text-center p-3 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right p-3 font-medium text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, i) => {
                    const days = order.deliveredAt
                      ? daysSince(order.deliveredAt)
                      : null;
                    const eligible = isEligible(order);
                    const isGiven = order.cashbackStatus === "given";
                    const daysLeft = order.deliveredAt
                      ? Math.max(0, 7 - daysSince(order.deliveredAt))
                      : null;

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin_cashback.item.${i + 1}`}
                      >
                        <td className="p-3">
                          <p className="font-mono text-xs font-semibold text-foreground">
                            {order.id}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            ₹{order.productPrice * order.quantity}
                          </p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium text-foreground">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.customerPhone}
                          </p>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          {order.deliveredAt ? (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-3 h-3 text-primary" />
                              {new Date(order.deliveredAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center hidden sm:table-cell">
                          {days !== null ? (
                            <div className="flex items-center justify-center gap-1 text-xs">
                              <Clock
                                className={`w-3 h-3 ${days >= 7 ? "text-primary" : "text-amber-600"}`}
                              />
                              <span
                                className={
                                  days >= 7
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                                }
                              >
                                {days}d
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <Badge
                            className={
                              isGiven
                                ? "bg-primary/10 text-primary border-0"
                                : eligible
                                  ? "bg-amber-100 text-amber-700 border-0"
                                  : "bg-muted text-muted-foreground border-0"
                            }
                          >
                            {isGiven
                              ? "Given"
                              : eligible
                                ? "Eligible"
                                : "Waiting"}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            size="sm"
                            className={`h-8 text-xs ${eligible ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                            variant={
                              isGiven
                                ? "outline"
                                : eligible
                                  ? "default"
                                  : "outline"
                            }
                            disabled={
                              isGiven || !eligible || markCashback.isPending
                            }
                            onClick={() => handleMarkGiven(order)}
                            data-ocid={`admin_cashback.mark_given_button.${i + 1}`}
                          >
                            {isGiven
                              ? "✓ Given"
                              : eligible
                                ? "Mark Given"
                                : daysLeft !== null
                                  ? `${daysLeft}d left`
                                  : "N/A"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
