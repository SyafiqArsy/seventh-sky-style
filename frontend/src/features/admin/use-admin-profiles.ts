"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export function useAdminProfiles(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-profiles", page, limit, search],
    queryFn: () => adminService.getProfiles(page, limit, search),
  });
}
