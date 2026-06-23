"use client";

import { useQuery } from "@tanstack/react-query";

import { adminService } from "@/services/admin.service";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],

    queryFn: async () => {
      const stats = await adminService.getStats();
      return {
        users: stats.users || 0,
        profiles: stats.profiles || 0,
        outfits: stats.outfits || 0,
        recommendations: stats.recommendations || 0,
        styles: stats.styles || 0,
        colors: stats.colors || 0,
        categories: stats.categories || 0,
        occasions: stats.occasions || 0,
        bodyTypes: stats.bodyTypes || 0,
        fashionItems: stats.fashionItems || 0,
      };
    },
  });
}