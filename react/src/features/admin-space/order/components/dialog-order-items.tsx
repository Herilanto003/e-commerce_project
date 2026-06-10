import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getOrderItems } from "../order-api";
import { API_URL } from "@/lib/config";

export function DialogOrderItems({
  id,
  open,
  setOpen,
}: {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const orderItems = useQuery({
    queryKey: ["OrderItems", id],
    queryFn: () => getOrderItems(id),
  });

  if (orderItems.isError) {
    console.log(orderItems.error);
  }

  const grandTotal =
    orderItems.data?.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0,
    ) ?? 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-base font-semibold tracking-tight">
            Lignes de commande
          </DialogTitle>
          {orderItems.data && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {orderItems.data.length} article
              {orderItems.data.length > 1 ? "s" : ""}
            </p>
          )}
        </DialogHeader>

        {/* Body */}
        <div className="no-scrollbar max-h-[55vh] overflow-auto">
          {orderItems.isPending ? (
            <div className="flex flex-col gap-3 px-6 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-16 h-16 rounded-xl bg-muted shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : orderItems.isError ? (
            <div className="px-6 py-8 text-center text-sm text-destructive">
              Impossible de charger les articles.
            </div>
          ) : (
            orderItems.data && (
              <ul className="divide-y divide-border">
                {orderItems.data.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/40 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                      <img
                        className="w-full h-full object-cover"
                        src={`${API_URL}/${item.image_link}`}
                        alt={item.product_name}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qté : {item.quantity} ×{" "}
                        <span className="text-foreground font-medium">
                          {item.unit_price.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </span>
                      </p>
                    </div>

                    {/* Subtotal */}
                    <div className="text-sm font-semibold tabular-nums shrink-0">
                      {(item.unit_price * item.quantity).toLocaleString(
                        "fr-FR",
                        { style: "currency", currency: "EUR" },
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        {/* Footer — total */}
        {orderItems.data && orderItems.data.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-base font-bold tabular-nums">
              {grandTotal.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
