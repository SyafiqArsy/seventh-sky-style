import { api } from "./api";

import {
  RecommendationItem,
  RecommendationDetail,
  LatestRecommendation,
} from "@/types/recommendation.types";

export interface GenerateRecommendationResponse {
  recommendation: {
    id: string;
  };
}

export const recommendationService = {
  async getLatest(): Promise<LatestRecommendation | null> {
    const { data } =
      await api.get(
        "/recommendations/me/latest",
      );

    return data;
  },

  async getHistory(): Promise<
    RecommendationItem[]
  > {
    const { data } =
      await api.get(
        "/recommendations/me/history",
      );

    return data;
  },

    async getById(
    id: string,
    ): Promise<RecommendationDetail> {
    const { data } =
        await api.get(
        `/recommendations/${id}`,
        );

    return data;
    },

  async generate(
    occasionId?: string,
  ): Promise<GenerateRecommendationResponse> {
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