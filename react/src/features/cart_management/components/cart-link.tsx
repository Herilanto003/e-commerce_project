import { Link } from "@tanstack/react-router";
import { TiShoppingCart } from "react-icons/ti";
import React, { useState } from "react";
import { API_URL } from "@/lib/config";
import { useRefreshCartNumber } from "../context/RefreshCartNumberContext";

export default function CartLink() {
  const [carts, setCarts] = useState<any[] | null>(null);
  const { refresh } = useRefreshCartNumber();

  React.useEffect(() => {
    const fetchAllCarts = async () => {
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
      }
    };

    fetchAllCarts();
  }, [refresh]);

  return (
    <Link
      to="/checkout"
      className="relative w-10 flex justify-center items-center"
    >
      <div className="text-xs font-bold text-white bg-sky-400 w-5 h-5 flex justify-center items-center absolute rounded-full -top-0.5 -right-1">
        {carts?.length}
      </div>
      <TiShoppingCart className="text-3xl" />
    </Link>
  );
}
