import { apiUrl } from "@/lib/config";
import { UserRegisterType } from "../type";

export const useRegister = () => {
  const register = async (
    formData: UserRegisterType,
  ): Promise<{ isSuccess: boolean; message: string }> => {
    console.log("url :: ", apiUrl);

    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
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
        message: "Register User Error !",
      };
    }

    return {
      isSuccess: true,
      message: "User register successfully !",
    };
  };

  return { register };
};
