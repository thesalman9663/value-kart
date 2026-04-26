import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useBackend";
import type { Product } from "@/types";
import { buildProductOrderMessage, buildWhatsAppUrl } from "@/utils/whatsapp";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  IndianRupee,
  MessageCircle,
  ShieldCheck,
  Star,
  Truck,
  Wallet,
} from "lucide-react";

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const waUrl = buildWhatsAppUrl(
    buildProductOrderMessage(product.name, product.price),
  );
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <Card
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/60"
      data-ocid={`featured_products.item.${index + 1}`}
    >
      <Link to="/products/$id" params={{ id: product.id }}>
        <div className="relative aspect-square overflow-hidden bg-muted/40">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 shadow-sm">
            ₹100 Cashback
          </Badge>
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 font-bold">
              {discount}% OFF
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-3">
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1.5 hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="font-bold text-foreground text-base">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        {/* WhatsApp is the sole purchase CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-xs gap-1.5 font-semibold shadow-sm"
            data-ocid={`featured_products.whatsapp_button.${index + 1}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Order via WhatsApp
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

// ─── Trust Badge ──────────────────────────────────────────────────────────────
function TrustBadge({
  icon,
  label,
  desc,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  href?: string;
}) {
  const content = (
    <div className="flex flex-col items-center text-center gap-1.5 py-2">
      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-0.5">
        {icon}
      </div>
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }
  return content;
}

// ─── Why Card ─────────────────────────────────────────────────────────────────
function WhyCard({
  icon,
  title,
  desc,
}: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-0.5">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: products, isLoading } = useFeaturedProducts(8);
  const whatsappUrl = buildWhatsAppUrl("Hi Value Kart! I need help. 🙏");

  return (
    <div data-ocid="home.page">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/40"
        data-ocid="home.hero_section"
      >
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            {/* Left copy */}
            <div className="order-2 sm:order-1">
              <Badge className="mb-3 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1 rounded-full">
                🎉 Limited Time — ₹100 Cashback on Every Order!
              </Badge>
              <h1 className="font-display font-bold text-3xl sm:text-4xl xl:text-5xl text-foreground leading-tight mb-3">
                Affordable Products +{" "}
                <span className="text-primary relative">
                  ₹100 Cashback
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full" />
                </span>{" "}
                After Delivery
              </h1>
              <p className="text-muted-foreground text-base mb-2 leading-relaxed">
                <span className="font-semibold text-foreground">
                  Shop Smart. Save More.
                </span>
              </p>
              <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
                Get ₹100 cashback automatically credited to your UPI within 7
                days after delivery. Quality products at unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" data-ocid="home.shop_now_button">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-7 font-semibold shadow-sm shadow-primary/20">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="home.whatsapp_cta"
                >
                  <Button
                    variant="outline"
                    className="border-primary/40 text-primary hover:bg-primary/5 gap-2 h-11 px-6 font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
            {/* Right image */}
            <div className="order-1 sm:order-2 flex justify-center sm:justify-end">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10">
                <img
                  src="/assets/generated/hero-shopping.dim_600x500.jpg"
                  alt="Happy shoppers with Value Kart"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                {/* Cashback pill over image */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground leading-none">
                      ₹100 Cashback
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      on every order!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <section
        className="bg-card border-b border-border py-6 px-4 shadow-sm"
        data-ocid="home.trust_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-6">
            <TrustBadge
              icon={<Wallet className="w-5 h-5 text-primary" />}
              label="UPI Payments"
              desc="Google Pay, PhonePe & Paytm"
            />
            <TrustBadge
              icon={<Truck className="w-5 h-5 text-primary" />}
              label="Cash on Delivery"
              desc="Pay when you receive"
            />
            <TrustBadge
              icon={<MessageCircle className="w-5 h-5 text-primary" />}
              label="WhatsApp Support"
              desc="+91 9645559663"
              href={whatsappUrl}
            />
          </div>
        </div>
      </section>

      {/* ── Cashback Banner ───────────────────────────────────────────────── */}
      <section
        className="bg-primary py-5 px-4"
        data-ocid="home.cashback_banner"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              <IndianRupee className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-lg text-primary-foreground">
                ₹100 Cashback on Every Order!
              </p>
              <p className="text-primary-foreground/75 text-xs mt-0.5">
                Credited to your UPI within 7 days of delivery. No conditions.
              </p>
            </div>
          </div>
          <Link to="/products" data-ocid="home.cashback_shop_button">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-sm px-6 h-9 flex-shrink-0">
              Shop & Save <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section
        className="py-10 px-4 bg-background"
        data-ocid="home.featured_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground leading-tight">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Hand-picked deals — every order earns ₹100 cashback
              </p>
            </div>
            <Link to="/products" data-ocid="home.view_all_link">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/40 text-primary hover:bg-primary/5 text-xs gap-1 flex-shrink-0"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-square" />
                    <CardContent className="p-3 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-9 w-full" />
                    </CardContent>
                  </Card>
                ))
              : products?.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
          </div>
        </div>
      </section>

      {/* ── Why Value Kart ────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-muted/30" data-ocid="home.why_section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-7">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Why Shop at Value Kart?
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Trusted by thousands of Indian shoppers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WHY_ITEMS.map((item) => (
              <WhyCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section
        className="py-10 px-4 bg-background"
        data-ocid="home.testimonials_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-7">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Happy Customers
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Real reviews from real buyers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.name}
                className="p-4 border-border/60 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      // biome-ignore lint/suspicious/noArrayIndexKey: star rating uses positional index intentionally
                      key={j}
                      className={`w-3.5 h-3.5 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3 italic leading-relaxed">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {t.city}
                    </p>
                  </div>
                  <ShieldCheck className="w-3.5 h-3.5 text-primary ml-auto" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-12 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5 border-t border-border/40"
        data-ocid="home.cta_section"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Ready to Save Big?
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Browse our full collection and earn ₹100 cashback on your first
            order!
          </p>
          <Link to="/products" data-ocid="home.final_cta_button">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-8 font-semibold shadow-md shadow-primary/20">
              Browse All Products <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  {
    icon: "🏷️",
    title: "Unbeatable Prices",
    desc: "Products at 40–70% off MRP, every day",
  },
  {
    icon: "💰",
    title: "₹100 Cashback",
    desc: "Credited to your UPI after every delivery",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Pan-India delivery in 3–7 working days",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "UPI, Google Pay, PhonePe & COD accepted",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    review:
      "Got ₹100 cashback within 5 days! Products are genuine and packaging was great.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    city: "Delhi",
    review:
      "Ordered via WhatsApp — super smooth! Cash on delivery made it stress-free.",
    rating: 5,
  },
  {
    name: "Anjali Singh",
    city: "Bangalore",
    review:
      "The smartband works perfectly. Amazing value for money. Will definitely reorder!",
    rating: 4,
  },
];
