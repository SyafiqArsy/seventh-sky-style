"use client";

import { useMutation } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

// ==================== STYLES ====================
export function useCreateStyle() {
  return useMutation({
    mutationFn: adminService.createStyle,
  });
}

export function useUpdateStyle() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; description?: string } }) =>
      adminService.updateStyle(id, payload),
  });
}

export function useDeleteStyle() {
  return useMutation({
    mutationFn: adminService.deleteStyle,
  });
}

// ==================== COLORS ====================
export function useCreateColor() {
  return useMutation({
    mutationFn: adminService.createColor,
  });
}

export function useUpdateColor() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; hexCode?: string } }) =>
      adminService.updateColor(id, payload),
  });
}

export function useDeleteColor() {
  return useMutation({
    mutationFn: adminService.deleteColor,
  });
}

// ==================== CATEGORIES ====================
export function useCreateCategory() {
  return useMutation({
    mutationFn: adminService.createCategory,
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; description?: string } }) =>
      adminService.updateCategory(id, payload),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: adminService.deleteCategory,
  });
}

// ==================== OCCASIONS ====================
export function useCreateOccasion() {
  return useMutation({
    mutationFn: adminService.createOccasion,
  });
}

export function useUpdateOccasion() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; description?: string } }) =>
      adminService.updateOccasion(id, payload),
  });
}

export function useDeleteOccasion() {
  return useMutation({
    mutationFn: adminService.deleteOccasion,
  });
}

// ==================== BODY TYPES ====================
export function useCreateBodyType() {
  return useMutation({
    mutationFn: adminService.createBodyType,
  });
}

export function useUpdateBodyType() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; description?: string } }) =>
      adminService.updateBodyType(id, payload),
  });
}

export function useDeleteBodyType() {
  return useMutation({
    mutationFn: adminService.deleteBodyType,
  });
}

// ==================== FASHION ITEMS ====================
export function useCreateFashionItem() {
  return useMutation({
    mutationFn: adminService.createFashionItem,
  });
}

export function useUpdateFashionItem() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      adminService.updateFashionItem(id, payload),
  });
}

export function useDeleteFashionItem() {
  return useMutation({
    mutationFn: adminService.deleteFashionItem,
  });
}

// ==================== OUTFITS ====================
export function useCreateOutfit() {
  return useMutation({
    mutationFn: adminService.createOutfit,
  });
}

export function useUpdateOutfit() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      adminService.updateOutfit(id, payload),
  });
}

export function useDeleteOutfit() {
  return useMutation({
    mutationFn: adminService.deleteOutfit,
  });
}
