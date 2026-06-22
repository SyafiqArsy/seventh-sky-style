"use client";

import { useQuery } from "@tanstack/react-query";

import { recommendationService } from "@/services/recommendation.service";

export function useRecommendationHistory() {
  return useQuery({
    queryKey: ["recommendation-history"],

    queryFn: () =>
      recommendationService.getHistory(),
  });
}