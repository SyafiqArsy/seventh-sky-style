import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StyleOnState {
  occasionId: string | null;

  pendingGenerate: boolean;

  setOccasionId: (
    id: string,
  ) => void;

  setPendingGenerate: (
    value: boolean,
  ) => void;

  clear: () => void;
}

export const useStyleOnStore =
  create<StyleOnState>()(
    persist(
      (set) => ({
        occasionId: null,

        pendingGenerate: false,

        setOccasionId: (
          id,
        ) =>
          set({
            occasionId: id,
          }),

        setPendingGenerate: (
          value,
        ) =>
          set({
            pendingGenerate: value,
          }),

        clear: () =>
          set({
            occasionId: null,
            pendingGenerate: false,
          }),
      }),
      {
        name: "style-on-storage",
      },
    ),
  );