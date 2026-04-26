import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/useBackend";
import type { Product, ProductInput } from "@/types";
import { ImageIcon, Package, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Watches", "Shoes", "Gadgets", "Clothes", "Other"];
const SIZE_PRESETS_CLOTHING = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
const SIZE_PRESETS_SHOES = ["6", "7", "8", "9", "10", "11"];

const EMPTY_FORM: ProductInput = {
  name: "",
  imageUrl: "",
  price: 0,
  originalPrice: 0,
  sizes: [],
  colors: [],
  description: "",
  category: "Gadgets",
  commission: 0,
};

function SizeChips({
  selected,
  onChange,
  category,
}: {
  selected: string[];
  onChange: (sizes: string[]) => void;
  category: string;
}) {
  const [custom, setCustom] = useState("");
  const presets =
    category === "Shoes" ? SIZE_PRESETS_SHOES : SIZE_PRESETS_CLOTHING;

  const toggle = (size: string) => {
    onChange(
      selected.includes(size)
        ? selected.filter((s) => s !== size)
        : [...selected, size],
    );
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
    }
    setCustom("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {presets.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => toggle(s)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-150 ${
              selected.includes(s)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-input text-foreground hover:border-primary/50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Add custom size (e.g. 42, XXXL)..."
          className="h-8 text-xs"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 px-3 text-xs flex-shrink-0"
          onClick={addCustom}
        >
          Add
        </Button>
      </div>
      {selected.filter((s) => !presets.includes(s)).length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {selected
            .filter((s) => !presets.includes(s))
            .map((s) => (
              <span
                key={s}
                className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-md"
              >
                {s}
                <button
                  type="button"
                  onClick={() => toggle(s)}
                  aria-label={`Remove ${s}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

function ImagePreview({ url }: { url: string }) {
  const [error, setError] = useState(false);
  if (!url || error) {
    return (
      <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30 flex-shrink-0">
        <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
      </div>
    );
  }
  return (
    <img
      src={url}
      alt="Preview"
      className="w-16 h-16 rounded-lg object-cover border border-border flex-shrink-0"
      onError={() => setError(true)}
    />
  );
}

function ProductFormDialog({
  open,
  onClose,
  initial,
  onSubmit,
  isPending,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  initial: ProductInput;
  onSubmit: (data: ProductInput) => Promise<void>;
  isPending: boolean;
  mode: "add" | "edit";
}) {
  const [form, setForm] = useState<ProductInput>(initial);
  const [colorsInput, setColorsInput] = useState(initial.colors.join(", "));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.price <= 0) {
      toast.error("Please fill in required fields (name & price)");
      return;
    }
    await onSubmit({
      ...form,
      colors: colorsInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    });
  };

  const set = <K extends keyof ProductInput>(key: K, val: ProductInput[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[92vh] overflow-y-auto"
        data-ocid="admin_products.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {mode === "add" ? "➕ Add New Product" : "✏️ Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-1">
          {/* Product Name */}
          <div>
            <Label className="text-sm font-semibold">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Titan Edge Slim Watch for Men"
              className="mt-1.5"
              required
              data-ocid="admin_products.name_input"
            />
          </div>

          {/* Image URL + Preview */}
          <div>
            <Label className="text-sm font-semibold">
              Image URL <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-3 mt-1.5 items-start">
              <ImagePreview url={form.imageUrl} />
              <div className="flex-1 min-w-0">
                <Input
                  value={form.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
                  placeholder="https://example.com/product-image.jpg"
                  required
                  data-ocid="admin_products.image_input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste a direct image link — preview updates automatically
                </p>
              </div>
            </div>
          </div>

          {/* Price + MRP */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-semibold">
                Selling Price (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                value={form.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
                placeholder="799"
                className="mt-1.5"
                required
                min={1}
                data-ocid="admin_products.price_input"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold">Original MRP (₹)</Label>
              <Input
                type="number"
                value={form.originalPrice || ""}
                onChange={(e) => set("originalPrice", Number(e.target.value))}
                placeholder="1499"
                className="mt-1.5"
                min={0}
                data-ocid="admin_products.original_price_input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used to show discount %
              </p>
            </div>
          </div>

          {/* Category + Commission */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-semibold">Category</Label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="admin_products.category_select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-sm font-semibold">Commission (₹)</Label>
              <Input
                type="number"
                value={form.commission || ""}
                onChange={(e) => set("commission", Number(e.target.value))}
                placeholder="150"
                className="mt-1.5"
                min={0}
                data-ocid="admin_products.commission_input"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Label className="text-sm font-semibold">Available Sizes</Label>
            <p className="text-xs text-muted-foreground mb-1.5">
              Click to select presets or type a custom size
            </p>
            <SizeChips
              selected={form.sizes}
              onChange={(s) => set("sizes", s)}
              category={form.category}
            />
          </div>

          {/* Colors */}
          <div>
            <Label className="text-sm font-semibold">
              Colors (comma-separated)
            </Label>
            <Input
              value={colorsInput}
              onChange={(e) => setColorsInput(e.target.value)}
              placeholder="Black, White, Red, Navy Blue"
              className="mt-1.5"
              data-ocid="admin_products.colors_input"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate each color with a comma
            </p>
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-semibold">Description</Label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe features, material, usage, what's in the box..."
              rows={3}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="admin_products.description_textarea"
            />
          </div>

          {/* Form actions */}
          <div className="flex gap-3 pt-1 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="admin_products.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              disabled={isPending}
              data-ocid="admin_products.submit_button"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Saving...
                </>
              ) : mode === "add" ? (
                <>
                  <Plus className="w-4 h-4" />
                  Save Product
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleAdd = async (data: ProductInput) => {
    try {
      await addProduct.mutateAsync(data);
      toast.success("Product added successfully!");
      setShowAdd(false);
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleEdit = async (data: ProductInput) => {
    if (!editTarget) return;
    try {
      await updateProduct.mutateAsync({ id: editTarget.id, input: data });
      toast.success("Product updated!");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div data-ocid="admin_products.page">
      {/* Page header with prominent Add Product button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {products?.length ?? 0} products in catalogue
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-10 px-5 font-semibold shadow-sm shadow-primary/20 self-start sm:self-auto"
          onClick={() => setShowAdd(true)}
          data-ocid="admin_products.add_product_button"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 hidden sm:block">
          <CardTitle className="text-sm text-muted-foreground font-medium">
            Product Catalogue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div
              className="p-8 text-center text-muted-foreground"
              data-ocid="admin_products.loading_state"
            >
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading products...
            </div>
          ) : !products?.length ? (
            <div
              className="p-12 text-center"
              data-ocid="admin_products.empty_state"
            >
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold text-foreground mb-1">
                No products yet
              </p>
              <p className="text-xs text-muted-foreground mb-5">
                Add your first product — it will appear instantly on the store
              </p>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => setShowAdd(true)}
                data-ocid="admin_products.add_first_button"
              >
                <Plus className="w-4 h-4" />
                Add First Product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto" data-ocid="admin_products.table">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/30 sticky top-0">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">
                      Product
                    </th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Sizes
                    </th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Colors
                    </th>
                    <th className="text-right p-3 font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="text-right p-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Commission
                    </th>
                    <th className="text-right p-3 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`admin_products.item.${i + 1}`}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-11 h-11 rounded-lg object-cover bg-muted flex-shrink-0 border border-border/50"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/assets/images/placeholder.svg";
                            }}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-foreground line-clamp-1">
                              {p.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              MRP: ₹{p.originalPrice}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className="text-xs border-primary/30 text-primary"
                        >
                          {p.category}
                        </Badge>
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {p.sizes.join(", ") || "—"}
                        </p>
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {p.colors.join(", ") || "—"}
                        </p>
                      </td>
                      <td className="p-3 text-right font-semibold text-foreground">
                        ₹{p.price}
                      </td>
                      <td className="p-3 text-right hidden sm:table-cell">
                        <span className="text-xs text-primary font-medium">
                          ₹{p.commission}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => setEditTarget(p)}
                            data-ocid={`admin_products.edit_button.${i + 1}`}
                            aria-label="Edit product"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteConfirm(p.id)}
                            data-ocid={`admin_products.delete_button.${i + 1}`}
                            aria-label="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      {showAdd && (
        <ProductFormDialog
          open={showAdd}
          onClose={() => setShowAdd(false)}
          initial={EMPTY_FORM}
          onSubmit={handleAdd}
          isPending={addProduct.isPending}
          mode="add"
        />
      )}

      {/* Edit Product Dialog */}
      {editTarget && (
        <ProductFormDialog
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          initial={{
            name: editTarget.name,
            imageUrl: editTarget.imageUrl,
            price: editTarget.price,
            originalPrice: editTarget.originalPrice,
            sizes: editTarget.sizes,
            colors: editTarget.colors,
            description: editTarget.description,
            category: editTarget.category,
            commission: editTarget.commission,
          }}
          onSubmit={handleEdit}
          isPending={updateProduct.isPending}
          mode="edit"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(o) => !o && setDeleteConfirm(null)}
      >
        <DialogContent
          className="max-w-sm"
          data-ocid="admin_products.delete_dialog"
        >
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. The product will be permanently
            removed from your catalogue.
          </p>
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteConfirm(null)}
              data-ocid="admin_products.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (deleteConfirm) {
                  void handleDelete(deleteConfirm);
                }
              }}
              disabled={deleteProduct.isPending}
              data-ocid="admin_products.delete_confirm_button"
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
