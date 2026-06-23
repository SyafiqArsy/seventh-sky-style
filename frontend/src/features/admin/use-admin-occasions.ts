"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminOccasions(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-occasions", page, limit, search],
    queryFn: () => adminService.getOccasions(page, limit, search),
  });
}
