import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as ShoppingBag, a as Button, b as buildWhatsAppUrl, d as buildProductOrderMessage, L as Link, B as Badge, M as MessageCircle } from "./index-BTYXqmFh.js";
import { b as useProducts, C as Card, a as CardContent } from "./useBackend-VDAK0KUu.js";
import { S as Skeleton } from "./skeleton-Cxoegg2X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode);
const CATEGORIES = ["All", "Watches", "Shoes", "Gadgets", "Clothes"];
function ProductCard({ product, index }) {
  const waUrl = buildWhatsAppUrl(
    buildProductOrderMessage(product.name, product.price)
  );
  const discount = product.originalPrice > product.price ? Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/60",
      "data-ocid": `products.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 shadow-sm", children: "₹100 Cashback" }),
          discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 font-bold", children: [
            discount,
            "% OFF"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground line-clamp-2 mb-1 hover:text-primary transition-colors leading-snug", children: product.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-[10px] px-1.5 py-0 h-4 font-medium bg-muted text-muted-foreground",
              children: product.category
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground text-base", children: [
              "₹",
              product.price
            ] }),
            product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
              "₹",
              product.originalPrice
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: waUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "block w-full",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-xs gap-1.5 font-semibold shadow-sm",
                  "data-ocid": `products.whatsapp_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                    "Order via WhatsApp"
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function ProductSkeleton({ count = 8 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: count }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
      ] })
    ] }, i)
  )) });
}
function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = products == null ? void 0 : products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );
  const productCount = (filtered == null ? void 0 : filtered.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-primary" }),
          "All Products"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          productCount,
          " product",
          productCount !== 1 ? "s" : "",
          " — every order gets ₹100 cashback"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-lg", children: "💰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-primary leading-tight", children: "₹100 Cashback" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "on every order" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border-b border-border/50 px-4 py-3 sticky top-0 z-10 backdrop-blur-sm bg-background/95", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide",
        "data-ocid": "products.category_filter",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground mr-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Filter:" })
          ] }),
          CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(cat),
              "data-ocid": `products.filter_${cat.toLowerCase()}_tab`,
              className: `flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20" : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:border-border"}`,
              children: cat
            },
            cat
          ))
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
        "data-ocid": "products.list",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, { count: 8 }) : (filtered == null ? void 0 : filtered.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "col-span-full flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "products.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "w-14 h-14 text-muted-foreground/30 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1 text-lg", children: "No products found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: activeCategory === "All" ? "No products available yet. Check back soon!" : `No products in "${activeCategory}" yet. Try a different category.` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => setActiveCategory("All"),
                  variant: "outline",
                  className: "border-primary/40 text-primary hover:bg-primary/5",
                  "data-ocid": "products.show_all_button",
                  children: "Show All Products"
                }
              )
            ]
          }
        ) : filtered == null ? void 0 : filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
      }
    ) }),
    !isLoading && ((filtered == null ? void 0 : filtered.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-4 mb-8 max-w-6xl sm:mx-auto rounded-xl bg-primary/8 border border-primary/20 px-5 py-4 flex flex-col sm:flex-row items-center gap-3",
        "data-ocid": "products.cashback_info_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl flex-shrink-0", children: "💰" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Get ₹100 cashback credited to your UPI within 7 days of delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Applies to every order. No minimum purchase. No conditions." })
          ] })
        ]
      }
    )
  ] });
}
export {
  ProductsPage as default
};
