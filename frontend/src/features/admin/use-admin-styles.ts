"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminStyles(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-styles", page, limit, search],
    queryFn: () => adminService.getStyles(page, limit, search),
  });
}
