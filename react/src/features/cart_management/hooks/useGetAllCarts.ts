import { API_URL } from "@/lib/config";
import React from "react";
import type { CartItemInterface } from "../cart_item.type";

export function useGetAllCarts() {
  const [pending, setPending] = React.useState(true);
  const [carts, setCarts] = React.useState<CartItemInterface[] | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchAllCarts = React.useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true); // silencieux
    } else {
      setPending(true); // affiche "Chargement..."
    }
    try {
      const response = await fetch(`${API_URL}/api/v1/cart/`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Error");
      }

      const data = await response.json();
      setCarts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchAllCarts(false);
  }, []);

  const refetch = React.useCallback(() => fetchAllCarts(true), []);

  return { pending, carts, refetch, refreshing };
}
