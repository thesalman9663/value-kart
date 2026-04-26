import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useBackend";
import type { Product } from "@/types";
import { buildProductOrderMessage, buildWhatsAppUrl } from "@/utils/whatsapp";
import { Link } from "@tanstack/react-router";
import {
  Filter,
  MessageCircle,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["All", "Watches", "Shoes", "Gadgets", "Clothes"];

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
      data-ocid={`products.item.${index + 1}`}
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
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 h-4 font-medium bg-muted text-muted-foreground"
          >
            {product.category}
          </Badge>
        </div>
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
            data-ocid={`products.whatsapp_button.${index + 1}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Order via WhatsApp
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-square" />
          <CardContent className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

// ─── ProductsPage ─────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products?.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );

  const productCount = filtered?.length ?? 0;

  return (
    <div data-ocid="products.page">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border px-4 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                All Products
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {isLoading ? (
                  <Skeleton className="h-4 w-48 mt-1" />
                ) : (
                  <>
                    {productCount} product{productCount !== 1 ? "s" : ""} —
                    every order gets ₹100 cashback
                  </>
                )}
              </p>
            </div>
            {/* Cashback pill */}
            <div className="hidden sm:flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-2">
              <span className="text-primary text-lg">💰</span>
              <div>
                <p className="text-xs font-bold text-primary leading-tight">
                  ₹100 Cashback
                </p>
                <p className="text-[10px] text-muted-foreground">
                  on every order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Filters ─────────────────────────────────────────────── */}
      <div className="bg-background border-b border-border/50 px-4 py-3 sticky top-0 z-10 backdrop-blur-sm bg-background/95">
        <div className="max-w-6xl mx-auto">
          <div
            className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide"
            data-ocid="products.category_filter"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground mr-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Filter:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid={`products.filter_${cat.toLowerCase()}_tab`}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                    : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          data-ocid="products.list"
        >
          {isLoading ? (
            <ProductSkeleton count={8} />
          ) : filtered?.length === 0 ? (
            <div
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              data-ocid="products.empty_state"
            >
              <PackageSearch className="w-14 h-14 text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold text-foreground mb-1 text-lg">
                No products found
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                {activeCategory === "All"
                  ? "No products available yet. Check back soon!"
                  : `No products in "${activeCategory}" yet. Try a different category.`}
              </p>
              <Button
                onClick={() => setActiveCategory("All")}
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5"
                data-ocid="products.show_all_button"
              >
                Show All Products
              </Button>
            </div>
          ) : (
            filtered?.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          )}
        </div>
      </div>

      {/* ── Bottom Banner ─────────────────────────────────────────────────── */}
      {!isLoading && (filtered?.length ?? 0) > 0 && (
        <div
          className="mx-4 mb-8 max-w-6xl sm:mx-auto rounded-xl bg-primary/8 border border-primary/20 px-5 py-4 flex flex-col sm:flex-row items-center gap-3"
          data-ocid="products.cashback_info_banner"
        >
          <div className="text-2xl flex-shrink-0">💰</div>
          <div className="text-center sm:text-left">
            <p className="font-semibold text-sm text-foreground">
              Get ₹100 cashback credited to your UPI within 7 days of delivery
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Applies to every order. No minimum purchase. No conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
