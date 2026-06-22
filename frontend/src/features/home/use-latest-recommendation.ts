"use client";

import { useQuery } from "@tanstack/react-query";

import {
  recommendationService,
} from "@/services/recommendation.service";

export function useLatestRecommendation() {
  return useQuery({
    queryKey: ["latest-recommendation"],

    queryFn: () =>
      recommendationService.getLatest(),
  });
}