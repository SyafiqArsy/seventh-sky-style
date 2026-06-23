"use client";

import { useQuery } from "@tanstack/react-query";

import {
  adminService,
} from "@/services/admin.service";

export function useDashboard() {
  return useQuery({
    queryKey: [
      "admin-dashboard",
    ],

    queryFn: () =>
      adminService.dashboard(),
  });
}