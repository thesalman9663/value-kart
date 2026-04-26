import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders, useProducts } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeDollarSign,
  Clock,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

const ORDER_STATUS_STYLES: Record<string, string> = {
  placed: "bg-amber-100 text-amber-700 border-0",
  confirmed: "bg-sky-100 text-sky-700 border-0",
  shipped: "bg-violet-100 text-violet-700 border-0",
  delivered: "bg-primary/10 text-primary border-0",
  cancelled: "bg-destructive/10 text-destructive border-0",
};

function StatCard({
  title,
  value,
  icon,
  sub,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  sub?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
              {title}
            </p>
            <p className="font-display font-bold text-2xl text-foreground mt-1">
              {value}
            </p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const quickActions = [
  {
    label: "Manage Products",
    to: "/admin/products" as const,
    icon: Package,
    description: "Add, edit, delete products",
  },
  {
    label: "View Orders",
    to: "/admin/orders" as const,
    icon: ShoppingBag,
    description: "Update order status",
  },
  {
    label: "Cashback Management",
    to: "/admin/cashback" as const,
    icon: BadgeDollarSign,
    description: "Mark cashback as given",
  },
];

export default function AdminDashboardPage() {
  const { data: products } = useProducts();
  const { data: orders } = useOrders();

  const totalProducts = products?.length ?? 0;
  const totalOrders = orders?.length ?? 0;
  const pendingOrders =
    orders?.filter((o) => o.orderStatus === "placed").length ?? 0;
  const totalRevenue =
    orders?.reduce((sum, o) => sum + o.productPrice * o.quantity, 0) ?? 0;
  const recentOrders = (orders ?? []).slice(0, 5);

  return (
    <div data-ocid="admin_dashboard.page">
      <div className="mb-6">
        <h1 className="font-display font-bold text-xl text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here's your store overview.
        </p>
      </div>

      {/* KPI Stats */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        data-ocid="admin_dashboard.stats"
      >
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<Clock className="w-5 h-5 text-primary" />}
          sub={pendingOrders > 0 ? "Needs attention" : "All clear"}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {quickActions.map(({ label, to, icon: Icon, description }) => (
          <Link
            key={to}
            to={to}
            data-ocid={`admin_dashboard.quick_action_${label.toLowerCase().replace(/\s+/g, "_")}_link`}
          >
            <Card className="hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent Orders
          </CardTitle>
          <Link to="/admin/orders">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1 text-primary h-7"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-ocid="admin_dashboard.orders_empty_state"
            >
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No orders yet</p>
              <p className="text-xs mt-1">
                Orders will appear here once customers start purchasing
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map((order, i) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2.5 gap-3"
                  data-ocid={`admin_dashboard.order.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {order.id}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {order.customerName} · ₹
                      {order.productPrice * order.quantity} ·{" "}
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      className={
                        ORDER_STATUS_STYLES[order.orderStatus] ??
                        "bg-muted text-muted-foreground border-0"
                      }
                    >
                      {order.orderStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
