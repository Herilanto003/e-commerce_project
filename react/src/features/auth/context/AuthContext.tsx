import { API_URL } from "@/lib/config";
import React from "react";

type UserType = {
  username: string;
  email: string;
  role: string;
};

export type AuthContextType = {
  user: UserType | null;
  isPending: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

const USER_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialisation depuis localStorage
  const [user, setUser] = React.useState<UserType | null>(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const [isPending, setIsPending] = React.useState<boolean>(false);

  // Sauvegarde automatique dans localStorage
  React.useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const fetchUser = async () => {
    setIsPending(true);

    try {
      const response = await fetch(`${API_URL}/auth/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsPending(false);
    }
  };

  const logout = async () => {
    setIsPending(true);
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur !");
      }
      await response.json();

      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);

      return { isSuccess: true };
    } catch (error) {
      throw new Error("Erreur de serveur !");
    } finally {
      setIsPending(false);
    }
    // setUser(null);
    // localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending,
        fetchUser,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider !");
  }

  return context;
}
