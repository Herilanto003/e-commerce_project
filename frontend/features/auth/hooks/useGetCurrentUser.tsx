import { apiUrl } from "@/lib/config";
import { cookies } from "next/headers";
import React from "react";

export const useGetCurrentUser = () => {
  const [userStatus, setUserStatus] = React.useState<
    "PENDING" | "CONNECTED" | "ERROR" | "NO_USER"
  >("PENDING");

  const getCurrentUser = async (): Promise<{
    isSuccess: boolean;
    message: string;
    user?: any;
  }> => {
    setUserStatus("PENDING");

    const response = await fetch(`${apiUrl}/auth/users/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      setUserStatus("ERROR");
      return {
        isSuccess: false,
        message: "Get user Error !",
        user: null,
      };
    }

    setUserStatus("CONNECTED");
    return {
      isSuccess: true,
      message: "Get user with success !",
      user: data,
    };
  };

  return { getCurrentUser, userStatus };
};
