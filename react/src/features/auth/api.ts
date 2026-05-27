import { API_URL } from "@/lib/config";

export async function getMe() {
  const res = await fetch(`${API_URL}/auth/users/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Non authentifié !");

  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur de connexion !");
}
