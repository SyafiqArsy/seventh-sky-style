"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminFashionItems(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-fashion-items", page, limit, search],
    queryFn: () => adminService.getFashionItems(page, limit, search),
  });
}
