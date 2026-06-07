import { API_URL } from "@/lib/config";
import type { ProductType } from "./product-type";
import type { ProductZodType } from "./product-zod";

export const fetchAllProducts = async (): Promise<
  ProductType[] | undefined
> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/product`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error("error");
    }

    const data = await response.json();
    return data as ProductType[];
  } catch (error) {
    throw error;
  }
};

export const postProduct = async (data: ProductZodType) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/product`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData);
    }
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id: number, data: ProductZodType) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/product/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData);
    }
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id: number): Promise<ProductType> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/product/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/product/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
