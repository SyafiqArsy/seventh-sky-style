"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminOutfits(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-outfits", page, limit, search],
    queryFn: () => adminService.getOutfits(page, limit, search),
  });
}
