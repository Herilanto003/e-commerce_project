"use client";

import React from "react";
import { ApiError, apiFetch } from "@/lib/api";

type ErrorType = {
  status: number;
  message: string;
} | null;

type UserType =
  | {
      email: string;
      username: string;
      role: string;
    }
  | null
  | undefined;

export function useAuth() {
  const [user, setUser] = React.useState<UserType>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<ErrorType>(null);

  React.useEffect(() => {
    apiFetch("/auth/users/me", { method: "GET" })
      .then(setUser)
      .catch((e: unknown) => {
        setUser(null);

        if (e instanceof ApiError) {
          switch (e.status) {
            case 401:
              setError({ status: 401, message: "Unauthorized !" });
              window.location.href = "/login";
              break;

            case 400:
              setError({ status: 400, message: "Error to get data !" });
              break;

            default:
              setError({ status: e.status, message: e.message });
              break;
          }
        } else {
          setError({ status: 0, message: "Network Error !" });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  };

  return { user, loading, logout, error };
}
