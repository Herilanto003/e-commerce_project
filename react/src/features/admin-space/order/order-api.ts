import { API_URL } from "@/lib/config";
import type { OrderItemType, OrderType } from "./order-type";

export async function getAllOrders(): Promise<OrderType[]> {
  const response = await fetch(`${API_URL}/api/v1/orders/`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error("Error");
  }

  return await response.json();
}

export async function getOrderItems(
  id: number,
): Promise<OrderItemType[] | null | undefined> {
  const response = await fetch(`${API_URL}/api/v1/orders/items/${id}`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error("Error");
  }

  const data = await response.json();
  console.log(data);

  return data;
}
