import { API_URL } from "@/lib/config";
import type { TotalInterface } from "./dasboard-type";

export async function fetchAllTotals(): Promise<TotalInterface> {
  const response = await fetch(`${API_URL}/api/v1/dashboard`, {
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
