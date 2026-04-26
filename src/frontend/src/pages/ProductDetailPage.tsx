import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/hooks/useBackend";
import { buildProductOrderMessage, buildWhatsAppUrl } from "@/utils/whatsapp";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  MessageCircle,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/layout/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  if (isLoading) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-6"
        data-ocid="product_detail.loading_state"
      >
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        data-ocid="product_detail.error_state"
      >
        <p className="text-5xl mb-4">😕</p>
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/products" data-ocid="product_detail.back_link">
          <Button className="bg-primary text-primary-foreground">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const needsSize =
    product.sizes.length > 0 && product.sizes[0] !== "Free Size";

  const validateSelections = (): boolean => {
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
      toast.error("Please select size and color before proceeding");
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
      size: needsSize ? selectedSize : (product.sizes[0] ?? "Free Size"),
      color: selectedColor || (product.colors[0] ?? ""),
      quantity: 1,
    });
    toast.success("Added to cart!");
  };

  const waMessage = buildProductOrderMessage(
    product.name,
    product.price,
    needsSize ? selectedSize : product.sizes[0],
    selectedColor || product.colors[0],
  );
  const waUrl = buildWhatsAppUrl(waMessage);

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-6"
      data-ocid="product_detail.page"
    >
      {/* Back link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-5 transition-colors"
        data-ocid="product_detail.back_link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
            <img
              src={product.imageUrl || "/assets/images/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          </div>
          {/* Cashback badge on image */}
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-semibold shadow-md">
            💰 ₹100 Cashback
          </Badge>
          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-semibold shadow-md">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          {/* Category + Name + Rating */}
          <div>
            <Badge
              variant="outline"
              className="mb-2 text-xs border-primary/30 text-primary"
              data-ocid="product_detail.category_tag"
            >
              {product.category}
            </Badge>
            <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={`star-filled-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: static count
                    i
                  }`}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground ml-1">
                4.0 (128 reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              className="font-display font-bold text-3xl text-foreground"
              data-ocid="product_detail.price"
            >
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-muted-foreground line-through text-base">
                ₹{product.originalPrice}
              </span>
            )}
            {discount > 0 && (
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Cashback card */}
          <Card
            className="p-3 bg-primary/5 border-primary/25"
            data-ocid="product_detail.cashback_card"
            title="₹100 cashback credited to your UPI within 7 days of delivery"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">💰</span>
              <div>
                <p className="text-sm font-semibold text-primary">
                  ₹100 Cashback on this order
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Credited to your UPI within 7 days of delivery
                </p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Size selector */}
          {needsSize && (
            <div data-ocid="product_detail.size_selector">
              <p className="text-sm font-semibold text-foreground mb-2">
                Size
                {sizeError && (
                  <span className="text-destructive text-xs ml-2 font-normal">
                    * Please select a size
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    data-ocid={`product_detail.size_${size.toLowerCase().replace(/\s/g, "_")}`}
                    className={`min-w-10 h-10 px-3 text-sm font-medium rounded-md border transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : sizeError
                          ? "border-destructive text-foreground hover:border-primary"
                          : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div data-ocid="product_detail.color_selector">
              <p className="text-sm font-semibold text-foreground mb-2">
                Color
                {colorError && (
                  <span className="text-destructive text-xs ml-2 font-normal">
                    * Please select a color
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setColorError(false);
                    }}
                    data-ocid={`product_detail.color_${color.toLowerCase().replace(/[\s/]/g, "_")}`}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      selectedColor === color
                        ? "bg-primary text-primary-foreground border-primary"
                        : colorError
                          ? "border-destructive text-foreground hover:border-primary"
                          : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons — WhatsApp is the PRIMARY CTA */}
          <div className="flex flex-col gap-2.5 mt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              data-ocid="product_detail.whatsapp_button"
            >
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-13 font-bold text-base gap-2 shadow-md shadow-primary/25 py-3">
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp — ₹{product.price}
              </Button>
            </a>
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted/60 h-11 gap-2 text-sm"
              onClick={handleAddToCart}
              data-ocid="product_detail.add_cart_button"
            >
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              Add to Cart
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Fast delivery pan-India</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              <span>COD & UPI accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
