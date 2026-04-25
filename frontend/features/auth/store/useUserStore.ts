import { create } from "zustand";
import { apiUrl } from "@/lib/config";

type User = {
  username: string;
  email: string;
  role: string;
};

type Status = "IDLE" | "PENDING" | "CONNECTED" | "ERROR";

type UserStore = {
  user: User | null;
  status: Status;

  fetchUser: () => Promise<void>;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  status: "PENDING",

  fetchUser: async () => {
    try {
      set({ status: "PENDING" });

      const response = await fetch(`${apiUrl}/auth/users/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      set({
        user: {
          username: data.username,
          email: data.email,
          role: data.role,
        },
        status: "CONNECTED",
      });
    } catch (error) {
      set({
        user: null,
        status: "ERROR",
      });
      console.error(error);
    }
  },

  clearUser: () => {
    set({
      user: null,
      status: "IDLE",
    });
  },
}));
