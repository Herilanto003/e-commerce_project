import React from "react";
import { type registerZodType } from "../schema/register_zod";
import { API_URL } from "@/lib/config";

export function useRegister() {
  const [isPending, setIsPending] = React.useState(false);

  const register = async (
    formData: registerZodType,
  ): Promise<{ isSuccess: boolean; message: string }> => {
    setIsPending(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          isSuccess: false,
          message: "Erreur est survenue !",
        };
      }

      console.log("Data :", data);

      return {
        isSuccess: true,
        message: "Utilisateur enregistré avec succès !",
      };
    } catch (error) {
      return { isSuccess: false, message: "Erreur est survenue !" };
    } finally {
      setIsPending(false);
    }
  };

  return { register, isPending };
}
