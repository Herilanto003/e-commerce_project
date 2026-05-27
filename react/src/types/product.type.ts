export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  stock_qty: number;
  unit_price: number;
  category_id: number;
  image_link: string | null | undefined;
}
