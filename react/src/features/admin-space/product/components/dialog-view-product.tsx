import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_URL } from "@/lib/config";
import type { ProductType } from "../product-type";

export function DialogViewProduct({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductType | null;
}) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sky-500">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          {/* Image */}
          <img
            src={API_URL + "/" + product.image_link}
            alt={product.name}
            className="w-40 h-40 object-contain rounded-lg border"
          />

          {/* Infos */}
          <div className="w-full flex flex-col gap-2 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Référence</span>
              <span className="font-medium">PRD - {product.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Catégorie</span>
              <span className="font-medium">{product.category_id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Prix unitaire</span>
              <span className="font-medium">{product.unit_price} €</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Stock</span>
              <span
                className={`font-medium ${
                  product.stock_qty === 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {product.stock_qty === 0
                  ? "Rupture de stock"
                  : `${product.stock_qty} unités`}
              </span>
            </div>
            {product.description && (
              <div className="flex flex-col gap-1 pt-1">
                <span className="text-muted-foreground">Description</span>
                <p className="text-sm">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
