import { r as reactExports, j as jsxRuntimeExports, l as BadgeDollarSign, B as Badge, a as Button } from "./index-BTYXqmFh.js";
import { j as useOrders, o as useMarkCashbackGiven, C as Card, a as CardContent, e as CardHeader, f as CardTitle } from "./useBackend-VDAK0KUu.js";
import { u as ue } from "./index-BS8MnL3d.js";
import { C as CircleCheck } from "./circle-check-DwjxaNnu.js";
import { C as Clock } from "./clock-a9aQk0VK.js";
function daysSince(timestamp) {
  return Math.floor((Date.now() - timestamp) / (1e3 * 60 * 60 * 24));
}
function isEligible(order) {
  if (order.cashbackStatus === "given") return false;
  if (!order.deliveredAt) return false;
  return daysSince(order.deliveredAt) >= 7;
}
function AdminCashbackPage() {
  const { data: orders, isLoading } = useOrders();
  const markCashback = useMarkCashbackGiven();
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const deliveredOrders = (orders ?? []).filter(
    (o) => o.orderStatus === "delivered"
  );
  const pendingCount = deliveredOrders.filter(
    (o) => o.cashbackStatus !== "given"
  ).length;
  const eligibleCount = deliveredOrders.filter(isEligible).length;
  const givenCount = deliveredOrders.filter(
    (o) => o.cashbackStatus === "given"
  ).length;
  const filteredOrders = deliveredOrders.filter((o) => {
    if (activeTab === "pending") return o.cashbackStatus !== "given";
    if (activeTab === "given") return o.cashbackStatus === "given";
    return true;
  });
  const handleMarkGiven = async (order) => {
    if (order.cashbackStatus === "given") return;
    if (!isEligible(order)) {
      const days = order.deliveredAt ? daysSince(order.deliveredAt) : 0;
      ue.error(
        `Cashback eligible after 7 days. ${7 - days} day(s) remaining.`
      );
      return;
    }
    try {
      await markCashback.mutateAsync(order.id);
      ue.success(`₹100 cashback marked as given for ${order.customerName}`);
    } catch {
      ue.error("Failed to update cashback status");
    }
  };
  const tabs = [
    { key: "all", label: "All Delivered", count: deliveredOrders.length },
    { key: "pending", label: "Pending Cashback", count: pendingCount },
    { key: "given", label: "Cashback Given", count: givenCount }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin_cashback.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Cashback Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Track and process ₹100 cashback for delivered orders" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: deliveredOrders.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total Delivered" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-amber-600", children: eligibleCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Eligible Now" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: givenCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Given" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 p-1 bg-muted rounded-lg mb-4 w-full",
        "data-ocid": "admin_cashback.filter_tabs",
        children: tabs.map(({ key, label, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(key),
            className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${activeTab === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `admin_cashback.filter_${key}_tab`,
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-primary/10 text-primary" : "bg-muted-foreground/20"}`,
                  children: count
                }
              )
            ]
          },
          key
        ))
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "admin_cashback.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" }),
          "Loading..."
        ]
      }
    ) : filteredOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16",
        "data-ocid": "admin_cashback.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeDollarSign, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: activeTab === "all" ? "No delivered orders yet" : activeTab === "pending" ? "No pending cashbacks" : "No cashbacks given yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: activeTab === "all" ? "Orders marked as delivered will appear here" : "" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm text-muted-foreground font-medium", children: [
        filteredOrders.length,
        " order",
        filteredOrders.length !== 1 ? "s" : ""
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-3 font-medium text-muted-foreground hidden sm:table-cell", children: "Days Since" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-3 font-medium text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredOrders.map((order, i) => {
          const days = order.deliveredAt ? daysSince(order.deliveredAt) : null;
          const eligible = isEligible(order);
          const isGiven = order.cashbackStatus === "given";
          const daysLeft = order.deliveredAt ? Math.max(0, 7 - daysSince(order.deliveredAt)) : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
              "data-ocid": `admin_cashback.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold text-foreground", children: order.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "₹",
                    order.productPrice * order.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: order.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.customerPhone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 hidden md:table-cell", children: order.deliveredAt ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary" }),
                  new Date(order.deliveredAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center hidden sm:table-cell", children: days !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Clock,
                    {
                      className: `w-3 h-3 ${days >= 7 ? "text-primary" : "text-amber-600"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: days >= 7 ? "text-primary font-medium" : "text-muted-foreground",
                      children: [
                        days,
                        "d"
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: isGiven ? "bg-primary/10 text-primary border-0" : eligible ? "bg-amber-100 text-amber-700 border-0" : "bg-muted text-muted-foreground border-0",
                    children: isGiven ? "Given" : eligible ? "Eligible" : "Waiting"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: `h-8 text-xs ${eligible ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`,
                    variant: isGiven ? "outline" : eligible ? "default" : "outline",
                    disabled: isGiven || !eligible || markCashback.isPending,
                    onClick: () => handleMarkGiven(order),
                    "data-ocid": `admin_cashback.mark_given_button.${i + 1}`,
                    children: isGiven ? "✓ Given" : eligible ? "Mark Given" : daysLeft !== null ? `${daysLeft}d left` : "N/A"
                  }
                ) })
              ]
            },
            order.id
          );
        }) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminCashbackPage as default
};
