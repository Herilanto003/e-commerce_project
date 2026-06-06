import { API_URL } from "@/lib/config";
import type { CategoryType } from "./category-type";
import type { CategoryZodType } from "./category-zod";

export const fetchAllCategories = async (): Promise<
  CategoryType[] | undefined
> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/category`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error("error");
    }

    const data = await response.json();
    return data as CategoryType[];
  } catch (error) {
    throw error;
  }
};

export const postCategorie = async (data: CategoryZodType) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/category`, {
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

export const updateCategorie = async (id: number, data: CategoryZodType) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/category/${id}`, {
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

export const getCategory = async (id: number): Promise<CategoryType> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/category/${id}`, {
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

export const deleteCategory = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/category/${id}`, {
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
