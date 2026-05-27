import React from "react";
import { type loginZodType } from "../schema/login_zod";
import { API_URL } from "@/lib/config";

type UserType = {
  username: string;
  email: string;
  role: string;
};

export function useLogin() {
  const [isPending, setIsPending] = React.useState(false);

  const login = async (
    formData: loginZodType,
  ): Promise<{
    isSuccess: boolean;
    message: string;
    data: UserType | null;
  }> => {
    setIsPending(true);
    try {
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          isSuccess: false,
          message: "Email ou mot de passe incorrect !",
          data: null,
        };
      }

      console.log("Data :", data);

      localStorage.setItem("auth_user", JSON.stringify(data));

      return {
        isSuccess: true,
        message: "Utilisateur connecté avec succès !",
        data: data,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Email ou mot de passe incorrect !",
        data: null,
      };
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending };
}
