import { apiUrl } from "@/lib/config";
import { UserInfoType } from "./type";
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<{
  isSuccess: boolean;
  user: UserInfoType | null;
}> {
  const cookieStore = cookies();

  const res = await fetch(`${apiUrl}/auth/users/me`, {
    method: "GET",
    headers: {
      cookie: (await cookieStore).toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return { isSuccess: false, user: null };
  }

  return {
    isSuccess: true,
    user: {
      username: data?.username,
      email: data?.email,
      role: data?.role,
    },
  };
}
