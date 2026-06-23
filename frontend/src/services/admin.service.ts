import { api } from "./api";

export const adminService = {
  async getUsers() {
    const { data } =
      await api.get("/users");

    return data;
  },

  async getStats() {
    const { data } =
      await api.get(
        "/admin/stats",
      );

    return data;
  },
}; 