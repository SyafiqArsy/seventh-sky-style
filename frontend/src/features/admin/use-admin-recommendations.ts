"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminRecommendations(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-recommendations", page, limit, search],
    queryFn: () => adminService.getRecommendations(page, limit, search),
  });
}
