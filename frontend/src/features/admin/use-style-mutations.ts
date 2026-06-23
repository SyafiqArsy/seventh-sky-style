"use client";

import { useMutation } from "@tanstack/react-query";

import { adminService } from "@/services/admin.service";

export function useCreateStyle() {
  return useMutation({
    mutationFn: adminService.createStyle,
  });
}

export function useUpdateStyle() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: any) =>
      adminService.updateStyle(
        id,
        payload,
      ),
  });
}

export function useDeleteStyle() {
  return useMutation({
    mutationFn: (id: string) =>
      adminService.deleteStyle(id),
  });
}