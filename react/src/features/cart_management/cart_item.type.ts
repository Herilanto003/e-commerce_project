export interface CartItemInterface {
  id: string;
  name: string | undefined;
  price: number | undefined;
  imageUrl: string | undefined | null;
  quantity: number;
  product_id: number;
}
