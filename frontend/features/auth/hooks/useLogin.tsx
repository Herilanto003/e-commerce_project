import { apiUrl } from "@/lib/config";
import { UserLoginZodType } from "../zod_schema/login_schema";

export const useLogin = () => {
  const login = async (
    formData: UserLoginZodType,
  ): Promise<{ isSuccess: boolean; message: string }> => {
    console.log("url :: ", apiUrl);

    const response = await fetch(`${apiUrl}/auth/token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("data::", data);

    if (!response.ok) {
      return {
        isSuccess: false,
        message: "Login user Error !",
      };
    }

    return {
      isSuccess: true,
      message: "Login with success !",
    };
  };

  return { login };
};
