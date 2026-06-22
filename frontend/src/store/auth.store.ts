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

  setAuth: (
    token: string,
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

        setAuth: (
          token,
          user,
        ) =>
          set({
            accessToken: token,
            user,
          }),

        logout: () =>
          set({
            accessToken: null,
            user: null,
          }),
      }),
      {
        name: "auth-storage",
      },
    ),
  );