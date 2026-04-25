import { apiUrl } from "@/lib/config";

export const useLogout = () => {
  const logout = async (): Promise<{ isSuccess: boolean; message: string }> => {
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        isSuccess: false,
        message: "lgout user Error !",
      };
    }

    return {
      isSuccess: true,
      message: "Logout with success !",
    };
  };

  return { logout };
};
