import { api } from "./api";

import {
  LoginRequest,
  LoginResponse,
  CurrentUser,
} from "@/types/auth.types";

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: CurrentUser;
}

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

  async register(
    payload: RegisterRequest,
  ): Promise<RegisterResponse> {
    const { data } = await api.post(
      "/auth/register",
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