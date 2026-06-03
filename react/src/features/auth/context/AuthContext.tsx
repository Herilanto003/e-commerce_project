// import { API_URL } from "@/lib/config";
// import React, { useEffect, useState } from "react";

// type UserType = {
//   username: string;
//   email: string;
//   role: string;
// };

// export type AuthContextType = {
//   user: UserType | null;
//   isPending: boolean;
//   logout: () => void;
//   setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
// };

// const AuthContext = React.createContext<AuthContextType | null>(null);

// // const USER_STORAGE_KEY = "auth_user";

// export function AuthProvider({ children }: { children: React.ReactNode }) {
// Initialisation depuis localStorage
// const [user, setUser] = React.useState<UserType | null>(() => {
//   const storedUser = localStorage.getItem(USER_STORAGE_KEY);

//   if (!storedUser) return null;

//   try {
//     return JSON.parse(storedUser);
//   } catch {
//     return null;
//   }
// });

// const [isPending, setIsPending] = React.useState<boolean>(false);

// // Sauvegarde automatique dans localStorage
// React.useEffect(() => {
//   if (user) {
//     localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
//   } else {
//     localStorage.removeItem(USER_STORAGE_KEY);
//   }
// }, [user]);

// const fetchUser = async () => {
//   setIsPending(true);

//   try {
//     const response = await fetch(`${API_URL}/auth/users/me`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       setUser(null);
//       return;
//     }

//     const data = await response.json();

//     setUser(data);
//   } catch (error) {
//     setUser(null);
//   } finally {
//     setIsPending(false);
//   }
// };

import { API_URL } from "@/lib/config";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  toggleRefresh: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  // Restore auth state on app load
  useEffect(() => {
    console.log("test pass pass pass");
    const fetchUser = async () => {
      setIsLoading(true);

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
          setIsAuthenticated(false);
          return;
        }

        const data = await response.json();

        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const login = async (email: string, password: string) => {
    // Replace with your authentication logic
    const response = await fetch(API_URL + "/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);
      // Store token for persistence
      // localStorage.setItem("auth", userData.token);
    } else {
      throw new Error("Authentication failed");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, toggleRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
