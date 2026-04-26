import { c as createLucideIcon, j as jsxRuntimeExports, P as Package, S as ShoppingBag, l as BadgeDollarSign, L as Link, a as Button, B as Badge } from "./index-BTYXqmFh.js";
import { b as useProducts, j as useOrders, C as Card, a as CardContent, e as CardHeader, f as CardTitle } from "./useBackend-VDAK0KUu.js";
import { C as Clock } from "./clock-a9aQk0VK.js";
import { A as ArrowRight } from "./arrow-right-DyjO_bFU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const ORDER_STATUS_STYLES = {
  placed: "bg-amber-100 text-amber-700 border-0",
  confirmed: "bg-sky-100 text-sky-700 border-0",
  shipped: "bg-violet-100 text-violet-700 border-0",
  delivered: "bg-primary/10 text-primary border-0",
  cancelled: "bg-destructive/10 text-destructive border-0"
};
function StatCard({
  title,
  value,
  icon,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide truncate", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground mt-1", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: icon })
  ] }) }) });
}
const quickActions = [
  {
    label: "Manage Products",
    to: "/admin/products",
    icon: Package,
    description: "Add, edit, delete products"
  },
  {
    label: "View Orders",
    to: "/admin/orders",
    icon: ShoppingBag,
    description: "Update order status"
  },
  {
    label: "Cashback Management",
    to: "/admin/cashback",
    icon: BadgeDollarSign,
    description: "Mark cashback as given"
  }
];
function AdminDashboardPage() {
  const { data: products } = useProducts();
  const { data: orders } = useOrders();
  const totalProducts = (products == null ? void 0 : products.length) ?? 0;
  const totalOrders = (orders == null ? void 0 : orders.length) ?? 0;
  const pendingOrders = (orders == null ? void 0 : orders.filter((o) => o.orderStatus === "placed").length) ?? 0;
  const totalRevenue = (orders == null ? void 0 : orders.reduce((sum, o) => sum + o.productPrice * o.quantity, 0)) ?? 0;
  const recentOrders = (orders ?? []).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin_dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Welcome back! Here's your store overview." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
        "data-ocid": "admin_dashboard.stats",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Total Products",
              value: totalProducts,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Total Orders",
              value: totalOrders,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Revenue",
              value: `₹${totalRevenue.toLocaleString("en-IN")}`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Pending Orders",
              value: pendingOrders,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }),
              sub: pendingOrders > 0 ? "Needs attention" : "All clear"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6", children: quickActions.map(({ label, to, icon: Icon, description }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to,
        "data-ocid": `admin_dashboard.quick_action_${label.toLowerCase().replace(/\s+/g, "_")}_link`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
        ] }) })
      },
      to
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Recent Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs gap-1 text-primary h-7",
            children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-8 text-muted-foreground",
          "data-ocid": "admin_dashboard.orders_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No orders yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Orders will appear here once customers start purchasing" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-2.5 gap-3",
          "data-ocid": `admin_dashboard.order.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: order.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                order.customerName,
                " · ₹",
                order.productPrice * order.quantity,
                " ·",
                " ",
                order.paymentMethod
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: ORDER_STATUS_STYLES[order.orderStatus] ?? "bg-muted text-muted-foreground border-0",
                children: order.orderStatus
              }
            ) })
          ]
        },
        order.id
      )) }) })
    ] })
  ] });
}
export {
  AdminDashboardPage as default
};
