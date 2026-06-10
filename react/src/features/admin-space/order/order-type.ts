export type OrderType = {
  id: number;
  status_order: string;
  total_price_order: number;
  username: string;
  total_item: number;
};

export type OrderItemType = {
  id_order_item: number;
  quantity: number;
  id_product: number;
  product_name: string;
  image_link: string;
  unit_price: number;
};
