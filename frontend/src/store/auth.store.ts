import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  sub: string;
  email: string;
  role: string;
}

interface AuthState {
  accessToken: string | null;

  user: User | null;

  setToken: (
    token: string,
  ) => void;

  setUser: (
    user: User,
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        accessToken: null,

        user: null,

        setToken: (token) => {
          set({
            accessToken: token,
          });
          window.dispatchEvent(new Event('authChange'));
        },

        setUser: (user) => {
          set({
            user,
          });
          window.dispatchEvent(new Event('authChange'));
        },

        logout: () => {
          set({
            accessToken: null,
            user: null,
          });
          window.dispatchEvent(new Event('authChange'));
        },
      }),
      {
        name: "auth-storage",
      },
    ),
  );