import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
let token: string | null = null;

    if (typeof window !== "undefined") {
    const storage =
        localStorage.getItem("auth-storage");

    if (storage) {
        token =
        JSON.parse(storage).state
            ?.accessToken;
    }
    }

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});