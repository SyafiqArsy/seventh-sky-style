import { api } from "./api";

export const masterService = {
  async getStyles() {
    const { data } =
      await api.get("/styles");

    return data;
  },

  async getColors() {
    const { data } =
      await api.get("/colors");

    return data;
  },

  async getOccasions() {
    const { data } =
      await api.get("/occasions");

    return data;
  },
};