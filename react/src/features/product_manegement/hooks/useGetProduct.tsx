import React from "react";
import { API_URL_PRODUCT } from "../api.product";
import type { ProductInterface } from "../type.product";

export function useGetAllProduct() {
  const [isPending, setIsPending] = React.useState(true);
  const [products, setProducts] = React.useState<ProductInterface[] | null>(
    null,
  );

  const getAllProducts = async () => {
    setIsPending(true);
    try {
      const response = await fetch(API_URL_PRODUCT);

      if (!response.ok) {
        setProducts(null);
        console.log("Response Error :: ", response);
      }

      const data = await response.json();

      setProducts(data as ProductInterface[]);
    } catch (error) {
      console.log("Catch :", error);
    } finally {
      setIsPending(false);
    }
  };

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return { products, isPending };
}

export function useGetOneProduct(id: string) {
  const [isPending, setIsPending] = React.useState(true);
  const [product, setProduct] = React.useState<ProductInterface | null>(null);

  const getOneProduct = async () => {
    setIsPending(true);
    try {
      const response = await fetch(`${API_URL_PRODUCT}/${id}`);

      if (!response.ok) {
        setProduct(null);
        console.log("Error one product : ", response);
        throw new Error("erreur");
      }

      const data = await response.json();

      setProduct(data as ProductInterface);
    } catch (error) {
      console.log("response error for on product : ", error);
    } finally {
      setIsPending(false);
    }
  };

  React.useEffect(() => {
    getOneProduct();
  }, []);

  return { product, isPending };
}
