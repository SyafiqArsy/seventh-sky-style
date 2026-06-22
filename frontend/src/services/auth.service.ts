import { api } from "./api";

import {
  LoginRequest,
  LoginResponse,
  CurrentUser,
} from "@/types/auth.types";

export const authService = {
  async login(
    payload: LoginRequest,
  ): Promise<LoginResponse> {
    const { data } = await api.post(
      "/auth/login",
      payload,
    );

    return data;
  },

  async me(): Promise<CurrentUser> {
    const { data } =
      await api.get("/auth/me");

    return data;
  },
};