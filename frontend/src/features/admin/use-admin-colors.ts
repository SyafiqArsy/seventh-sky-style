"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminColors(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-colors", page, limit, search],
    queryFn: () => adminService.getColors(page, limit, search),
  });
}
