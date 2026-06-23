"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminBodyTypes(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-body-types", page, limit, search],
    queryFn: () => adminService.getBodyTypes(page, limit, search),
  });
}
