"use client";

import { useQuery } from "@tanstack/react-query";

import { adminService } from "@/services/admin.service";

export function useAdminUsers(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["admin-users", page, limit, search],
    queryFn: () => adminService.getUsers(page, limit, search),
  });
}