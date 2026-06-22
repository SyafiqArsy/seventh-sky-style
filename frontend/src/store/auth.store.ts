import { create } from "zustand";

interface AuthState {
  accessToken: string | null;

  setToken: (
    token: string,
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    accessToken: null,

    setToken: (token) => {
      localStorage.setItem(
        "accessToken",
        token,
      );

      set({
        accessToken: token,
      });
    },

    logout: () => {
      localStorage.removeItem(
        "accessToken",
      );

      set({
        accessToken: null,
      });
    },
  }));