import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, L as Link, a as Button, M as MessageCircle, b as buildWhatsAppUrl, d as buildProductOrderMessage } from "./index-BTYXqmFh.js";
import { u as useFeaturedProducts, C as Card, a as CardContent } from "./useBackend-VDAK0KUu.js";
import { S as Skeleton } from "./skeleton-Cxoegg2X.js";
import { A as ArrowRight } from "./arrow-right-DyjO_bFU.js";
import { T as Truck } from "./truck-xnyQdJux.js";
import { S as Star } from "./star-DWXoCzVa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
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
      "data-ocid": `featured_products.item.${index + 1}`,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground line-clamp-2 mb-1.5 hover:text-primary transition-colors leading-snug", children: product.name }) }),
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
                  "data-ocid": `featured_products.whatsapp_button.${index + 1}`,
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
function TrustBadge({
  icon,
  label,
  desc,
  href
}) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-1.5 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-0.5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: desc })
  ] });
  if (href) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "block hover:opacity-80 transition-opacity",
        children: content
      }
    );
  }
  return content;
}
function WhyCard({
  icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-sm transition-all duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-0.5", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: desc })
    ] })
  ] });
}
function HomePage() {
  const { data: products, isLoading } = useFeaturedProducts(8);
  const whatsappUrl = buildWhatsAppUrl("Hi Value Kart! I need help. 🙏");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/40",
        "data-ocid": "home.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 sm:order-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1 rounded-full", children: "🎉 Limited Time — ₹100 Cashback on Every Order!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-foreground leading-tight mb-3", children: [
              "Affordable Products +",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary relative", children: [
                "₹100 Cashback",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full" })
              ] }),
              " ",
              "After Delivery"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-2 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Shop Smart. Save More." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-7 leading-relaxed", children: "Get ₹100 cashback automatically credited to your UPI within 7 days after delivery. Quality products at unbeatable prices." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "home.shop_now_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-7 font-semibold shadow-sm shadow-primary/20", children: [
                "Shop Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: whatsappUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "home.whatsapp_cta",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "border-primary/40 text-primary hover:bg-primary/5 gap-2 h-11 px-6 font-medium",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                        "WhatsApp Us"
                      ]
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-1 sm:order-2 flex justify-center sm:justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-shopping.dim_600x500.jpg",
                alt: "Happy shoppers with Value Kart",
                className: "w-full h-64 sm:h-80 object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground leading-none", children: "₹100 Cashback" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "on every order!" })
              ] })
            ] })
          ] }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border py-6 px-4 shadow-sm",
        "data-ocid": "home.trust_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-primary" }),
              label: "UPI Payments",
              desc: "Google Pay, PhonePe & Paytm"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-primary" }),
              label: "Cash on Delivery",
              desc: "Pay when you receive"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-primary" }),
              label: "WhatsApp Support",
              desc: "+91 9645559663",
              href: whatsappUrl
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-5 px-4",
        "data-ocid": "home.cashback_banner",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary-foreground", children: "₹100 Cashback on Every Order!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-xs mt-0.5", children: "Credited to your UPI within 7 days of delivery. No conditions." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "home.cashback_shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-sm px-6 h-9 flex-shrink-0", children: [
            "Shop & Save ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 px-4 bg-background",
        "data-ocid": "home.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: "Featured Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Hand-picked deals — every order earns ₹100 cashback" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "home.view_all_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "border-primary/40 text-primary hover:bg-primary/5 text-xs gap-1 flex-shrink-0",
                children: [
                  "View All ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4", children: isLoading ? Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
              ] })
            ] }, i)
          )) : products == null ? void 0 : products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-4 bg-muted/30", "data-ocid": "home.why_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Why Shop at Value Kart?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Trusted by thousands of Indian shoppers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: WHY_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        WhyCard,
        {
          icon: item.icon,
          title: item.title,
          desc: item.desc
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 px-4 bg-background",
        "data-ocid": "home.testimonials_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Happy Customers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Real reviews from real buyers" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "p-4 border-border/60 hover:shadow-sm transition-shadow",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-3", children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-3.5 h-3.5 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`
                  },
                  j
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground mb-3 italic leading-relaxed", children: [
                  '"',
                  t.review,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: t.name[0] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: t.city })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary ml-auto" })
                ] })
              ]
            },
            t.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5 border-t border-border/40",
        "data-ocid": "home.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Ready to Save Big?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Browse our full collection and earn ₹100 cashback on your first order!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "home.final_cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-8 font-semibold shadow-md shadow-primary/20", children: [
            "Browse All Products ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] })
      }
    )
  ] });
}
const WHY_ITEMS = [
  {
    icon: "🏷️",
    title: "Unbeatable Prices",
    desc: "Products at 40–70% off MRP, every day"
  },
  {
    icon: "💰",
    title: "₹100 Cashback",
    desc: "Credited to your UPI after every delivery"
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Pan-India delivery in 3–7 working days"
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "UPI, Google Pay, PhonePe & COD accepted"
  }
];
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    review: "Got ₹100 cashback within 5 days! Products are genuine and packaging was great.",
    rating: 5
  },
  {
    name: "Rahul Verma",
    city: "Delhi",
    review: "Ordered via WhatsApp — super smooth! Cash on delivery made it stress-free.",
    rating: 5
  },
  {
    name: "Anjali Singh",
    city: "Bangalore",
    review: "The smartband works perfectly. Amazing value for money. Will definitely reorder!",
    rating: 4
  }
];
export {
  HomePage as default
};
