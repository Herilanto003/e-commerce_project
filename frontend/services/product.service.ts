import { apiFetch } from "@/lib/api";
import { ProductInterface } from "@/types/product.type";

export async function getProducts(): Promise<ProductInterface[]> {
  return await apiFetch("/api/v1/product");
}
