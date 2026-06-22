"use client";

import { useQuery } from "@tanstack/react-query";

import {
  recommendationService,
} from "@/services/recommendation.service";

export function useRecommendationDetail(
  id: string,
) {
  return useQuery({
    queryKey: [
      "recommendation",
      id,
    ],

    queryFn: () =>
      recommendationService.getById(
        id,
      ),
  });
}