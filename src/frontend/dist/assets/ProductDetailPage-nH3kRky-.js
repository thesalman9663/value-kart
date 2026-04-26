import { c as createLucideIcon, u as useParams, e as useCart, r as reactExports, j as jsxRuntimeExports, L as Link, a as Button, d as buildProductOrderMessage, B as Badge, M as MessageCircle, f as ShoppingCart, b as buildWhatsAppUrl } from "./index-BTYXqmFh.js";
import { c as useProduct, C as Card } from "./useBackend-VDAK0KUu.js";
import { S as Skeleton } from "./skeleton-Cxoegg2X.js";
import { u as ue } from "./index-BS8MnL3d.js";
import { A as ArrowLeft } from "./arrow-left-U_1ZgN5Q.js";
import { S as Star } from "./star-DWXoCzVa.js";
import { T as Truck } from "./truck-xnyQdJux.js";
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function ProductDetailPage() {
  const { id } = useParams({ from: "/layout/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = reactExports.useState("");
  const [selectedColor, setSelectedColor] = reactExports.useState("");
  const [sizeError, setSizeError] = reactExports.useState(false);
  const [colorError, setColorError] = reactExports.useState(false);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-6",
        "data-ocid": "product_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
            ] })
          ] })
        ]
      }
    );
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-16 text-center",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-4", children: "😕" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "The product you're looking for doesn't exist or may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "product_detail.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary text-primary-foreground", children: "Browse Products" }) })
        ]
      }
    );
  }
  const discount = Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  );
  const needsSize = product.sizes.length > 0 && product.sizes[0] !== "Free Size";
  const validateSelections = () => {
    let valid = true;
    if (needsSize && !selectedSize) {
      setSizeError(true);
      valid = false;
    }
    if (product.colors.length > 0 && !selectedColor) {
      setColorError(true);
      valid = false;
    }
    if (!valid) {
      ue.error("Please select size and color before proceeding");
    }
    return valid;
  };
  const handleAddToCart = () => {
    if (!validateSelections()) return;
    addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: needsSize ? selectedSize : product.sizes[0] ?? "Free Size",
      color: selectedColor || (product.colors[0] ?? ""),
      quantity: 1
    });
    ue.success("Added to cart!");
  };
  const waMessage = buildProductOrderMessage(
    product.name,
    product.price,
    needsSize ? selectedSize : product.sizes[0],
    selectedColor || product.colors[0]
  );
  const waUrl = buildWhatsAppUrl(waMessage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 py-6",
      "data-ocid": "product_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-5 transition-colors",
            "data-ocid": "product_detail.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Products"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl || "/assets/images/placeholder.svg",
                alt: product.name,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-primary text-primary-foreground font-semibold shadow-md", children: "💰 ₹100 Cashback" }),
            discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-3 right-3 bg-destructive text-destructive-foreground font-semibold shadow-md", children: [
              discount,
              "% OFF"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "mb-2 text-xs border-primary/30 text-primary",
                  "data-ocid": "product_detail.category_tag",
                  children: product.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "w-4 h-4 text-amber-400 fill-amber-400"
                  },
                  `star-filled-${// biome-ignore lint/suspicious/noArrayIndexKey: static count
                  i}`
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "4.0 (128 reviews)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-display font-bold text-3xl text-foreground",
                  "data-ocid": "product_detail.price",
                  children: [
                    "₹",
                    product.price
                  ]
                }
              ),
              product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through text-base", children: [
                "₹",
                product.originalPrice
              ] }),
              discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-0 text-xs font-semibold", children: [
                discount,
                "% OFF"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "p-3 bg-primary/5 border-primary/25",
                "data-ocid": "product_detail.cashback_card",
                title: "₹100 cashback credited to your UPI within 7 days of delivery",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "💰" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: "₹100 Cashback on this order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Credited to your UPI within 7 days of delivery" })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: product.description }),
            needsSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.size_selector", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-2", children: [
                "Size",
                sizeError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs ml-2 font-normal", children: "* Please select a size" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelectedSize(size);
                    setSizeError(false);
                  },
                  "data-ocid": `product_detail.size_${size.toLowerCase().replace(/\s/g, "_")}`,
                  className: `min-w-10 h-10 px-3 text-sm font-medium rounded-md border transition-colors ${selectedSize === size ? "bg-primary text-primary-foreground border-primary" : sizeError ? "border-destructive text-foreground hover:border-primary" : "border-border text-foreground hover:border-primary hover:bg-primary/5"}`,
                  children: size
                },
                size
              )) })
            ] }),
            product.colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.color_selector", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-2", children: [
                "Color",
                colorError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs ml-2 font-normal", children: "* Please select a color" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelectedColor(color);
                    setColorError(false);
                  },
                  "data-ocid": `product_detail.color_${color.toLowerCase().replace(/[\s/]/g, "_")}`,
                  className: `px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${selectedColor === color ? "bg-primary text-primary-foreground border-primary" : colorError ? "border-destructive text-foreground hover:border-primary" : "border-border text-foreground hover:border-primary hover:bg-primary/5"}`,
                  children: color
                },
                color
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: waUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full",
                  "data-ocid": "product_detail.whatsapp_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-13 font-bold text-base gap-2 shadow-md shadow-primary/25 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                    "Order via WhatsApp — ₹",
                    product.price
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full border-border text-foreground hover:bg-muted/60 h-11 gap-2 text-sm",
                  onClick: handleAddToCart,
                  "data-ocid": "product_detail.add_cart_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-muted-foreground" }),
                    "Add to Cart"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fast delivery pan-India" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "COD & UPI accepted" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductDetailPage as default
};
