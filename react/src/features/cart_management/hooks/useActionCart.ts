import { API_URL } from "@/lib/config";
import React from "react";
import { useRefreshCartNumber } from "../context/RefreshCartNumberContext";

export function useActionCart() {
  const [pendingActionCart, setPendingActionCart] = React.useState(false);
  const { toggleRefresh } = useRefreshCartNumber();

  const increaseQuantity = async (
    product_id: number,
    onSuccess?: () => void,
  ) => {
    setPendingActionCart(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/cart/items/increase?product_id=${product_id}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("error");
      }

      const data = await response.json();
      toggleRefresh();
      console.log(data);
      onSuccess?.();
    } catch (error) {
      console.log(error);
    } finally {
      setPendingActionCart(false);
    }
  };

  const decreaseQuantity = async (
    product_id: number,
    onSuccess?: () => void,
  ) => {
    setPendingActionCart(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/cart/items/decrease?product_id=${product_id}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("error");
      }

      const data = await response.json();
      console.log(data);
      toggleRefresh();
      onSuccess?.();
    } catch (error) {
      console.log(error);
    } finally {
      setPendingActionCart(false);
    }
  };

  const clearCart = async (onSuccess?: () => void) => {
    setPendingActionCart(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/cart/items/remove-all`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("error");
      }

      const data = await response.json();
      console.log(data);
      toggleRefresh();
      onSuccess?.();
    } catch (error) {
      console.log(error);
    } finally {
      setPendingActionCart(false);
    }
  };

  return { pendingActionCart, increaseQuantity, decreaseQuantity, clearCart };
}
