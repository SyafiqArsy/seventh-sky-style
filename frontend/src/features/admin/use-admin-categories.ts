"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminCategories(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-categories", page, limit, search],
    queryFn: () => adminService.getCategories(page, limit, search),
  });
}
