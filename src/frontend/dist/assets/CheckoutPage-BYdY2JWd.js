import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, g as cn, e as useCart, h as useNavigate, S as ShoppingBag, L as Link, a as Button, B as Badge } from "./index-BTYXqmFh.js";
import { d as useCreateOrder, C as Card, e as CardHeader, f as CardTitle, a as CardContent } from "./useBackend-VDAK0KUu.js";
import { P as Primitive, L as Label, I as Input } from "./label-DmBrWu12.js";
import { S as Skeleton } from "./skeleton-Cxoegg2X.js";
import { u as ue } from "./index-BS8MnL3d.js";
import { A as ArrowLeft } from "./arrow-left-U_1ZgN5Q.js";
import { T as Truck } from "./truck-xnyQdJux.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function loadRazorpayScript() {
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
function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    address: "",
    email: ""
  });
  const [payment, setPayment] = reactExports.useState("COD");
  const [errors, setErrors] = reactExports.useState({});
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const validate = () => {
    const e = {};
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
        customerEmail: form.email || void 0,
        productId: item.productId,
        productName: item.productName,
        productPrice: item.price,
        productSize: item.size,
        productColor: item.color,
        quantity: item.quantity,
        paymentMethod: "COD"
      });
      clearCart();
      void navigate({
        to: "/order-confirmation",
        search: { orderId: order.id }
      });
    } catch {
      ue.error("Failed to place order. Please try again.");
    }
  };
  const handleUPIOrder = async () => {
    if (items.length === 0) return;
    const item = items[0];
    const order = await createOrder.mutateAsync({
      customerName: form.name,
      customerPhone: form.phone,
      customerAddress: form.address,
      customerEmail: form.email || void 0,
      productId: item.productId,
      productName: item.productName,
      productPrice: item.price,
      productSize: item.size,
      productColor: item.color,
      quantity: item.quantity,
      paymentMethod: "UPI"
    });
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      ue.error("Failed to load payment gateway. Please try again.");
      return;
    }
    const rzpOptions = {
      key: "rzp_test_placeholder",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Value Kart",
      description: "₹100 Cashback on Delivery",
      order_id: order.id,
      prefill: {
        name: form.name,
        contact: form.phone,
        email: form.email || void 0
      },
      theme: { color: "#22c55e" },
      handler: (response) => {
        clearCart();
        void navigate({
          to: "/order-confirmation",
          search: {
            orderId: order.id,
            paymentId: response.razorpay_payment_id
          }
        });
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          ue.error("Payment cancelled. Your order was not placed.");
        }
      }
    };
    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      ue.error("Your cart is empty");
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
      ue.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };
  const isPending = createOrder.isPending || isProcessing;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-16 text-center",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Add products to your cart before checking out." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary text-primary-foreground", children: "Browse Products" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-5 transition-colors",
        "data-ocid": "checkout.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Continue Shopping"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 order-2 lg:order-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", noValidate: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary" }),
            "Delivery Details"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Full Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  placeholder: "Enter your full name",
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  onBlur: () => {
                    if (!form.name.trim())
                      setErrors((ev) => ({
                        ...ev,
                        name: "Name is required"
                      }));
                    else setErrors((ev) => ({ ...ev, name: void 0 }));
                  },
                  className: `mt-1 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`,
                  "data-ocid": "checkout.name_input"
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "checkout.name_field_error",
                  children: errors.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-sm font-medium", children: "Mobile Number *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium", children: "+91" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "phone",
                    type: "tel",
                    placeholder: "10-digit mobile number",
                    value: form.phone,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10)
                    })),
                    onBlur: () => {
                      if (!form.phone.match(/^[6-9]\d{9}$/))
                        setErrors((ev) => ({
                          ...ev,
                          phone: "Enter a valid 10-digit mobile number"
                        }));
                      else setErrors((ev) => ({ ...ev, phone: void 0 }));
                    },
                    className: `pl-12 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "data-ocid": "checkout.phone_input"
                  }
                )
              ] }),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "checkout.phone_field_error",
                  children: errors.phone
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", className: "text-sm font-medium", children: "Delivery Address *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "address",
                  placeholder: "House no., Street, Area, City, State, PIN code",
                  value: form.address,
                  onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
                  onBlur: () => {
                    if (!form.address.trim() || form.address.length < 10)
                      setErrors((ev) => ({
                        ...ev,
                        address: "Enter complete delivery address (min 10 characters)"
                      }));
                    else setErrors((ev) => ({ ...ev, address: void 0 }));
                  },
                  rows: 3,
                  className: `mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none ${errors.address ? "border-destructive focus:ring-destructive" : "border-input"}`,
                  "data-ocid": "checkout.address_textarea"
                }
              ),
              errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "checkout.address_field_error",
                  children: errors.address
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "text-sm font-medium", children: [
                "Email Address",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  placeholder: "yourname@email.com",
                  value: form.email,
                  onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                  className: "mt-1",
                  "data-ocid": "checkout.email_input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
            "Payment Method"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${payment === "COD" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                "data-ocid": "checkout.cod_radio",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "payment",
                      value: "COD",
                      checked: payment === "COD",
                      onChange: () => setPayment("COD"),
                      className: "accent-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Cash on Delivery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pay when your order arrives" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 text-xs flex-shrink-0", children: "Recommended" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${payment === "UPI" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                "data-ocid": "checkout.upi_radio",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "payment",
                      value: "UPI",
                      checked: payment === "UPI",
                      onChange: () => setPayment("UPI"),
                      className: "accent-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "UPI Payment" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Google Pay, PhonePe, Paytm & all UPI apps" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-1.5 py-0.5 rounded font-medium text-foreground", children: "GPay" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted px-1.5 py-0.5 rounded font-medium text-foreground", children: "PhonePe" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold text-base shadow-sm",
            disabled: isPending,
            "data-ocid": "checkout.submit_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin",
                  "data-ocid": "checkout.loading_state"
                }
              ),
              payment === "UPI" ? "Opening Payment..." : "Placing Order..."
            ] }) : `Place Order — ₹${totalAmount}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "💰 ₹100 cashback will be credited within 7 days of delivery" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 order-1 lg:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "sticky top-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Order Summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-3 mb-4",
              "data-ocid": "checkout.order_summary",
              children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "checkout.items_loading", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" })
              ] }) : items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-3 text-sm",
                  "data-ocid": `checkout.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.imageUrl || "/assets/images/placeholder.svg",
                        alt: item.productName,
                        className: "w-14 h-14 rounded-lg object-cover bg-muted flex-shrink-0 border border-border",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground line-clamp-2 leading-tight", children: item.productName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-0.5", children: [
                        item.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                          "Size: ",
                          item.size
                        ] }),
                        item.color && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                          "· ",
                          item.color
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground flex-shrink-0", children: [
                      "₹",
                      item.price * item.quantity
                    ] })
                  ]
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Subtotal (",
                items.length,
                " item",
                items.length > 1 ? "s" : "",
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                totalAmount
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "FREE" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-primary text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cashback (after delivery)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "-₹100" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              totalAmount
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 text-center bg-primary/5 rounded-md px-2 py-1.5", children: [
            "Effective price after cashback:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
              "₹",
              Math.max(0, totalAmount - 100)
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
