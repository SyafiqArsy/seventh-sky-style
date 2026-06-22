import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StyleOnState {
  occasionId: string | null;

  setOccasionId: (
    id: string,
  ) => void;

  clear: () => void;
}

export const useStyleOnStore =
  create<StyleOnState>()(
    persist(
      (set) => ({
        occasionId: null,

        setOccasionId: (
          id,
        ) =>
          set({
            occasionId: id,
          }),

        clear: () =>
          set({
            occasionId: null,
          }),
      }),
      {
        name: "style-on-storage",
      },
    ),
  );