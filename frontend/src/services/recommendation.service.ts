import { api } from "./api";

export const recommendationService = {
  async getLatest() {
    const { data } =
      await api.get(
        "/recommendations/me/latest",
      );

    return data;
  },

  async getHistory() {
    const { data } =
      await api.get(
        "/recommendations/me/history",
      );

    return data;
  },

  async getById(id: string) {
    const { data } =
      await api.get(
        `/recommendations/${id}`,
      );

    return data;
  },

  async generate(
    occasionId?: string,
  ) {
    const { data } =
      await api.post(
        "/recommendations/generate",
        {
          occasionId,
        },
      );

    return data;
  },
};