import { z } from "zod";
import { create } from "zustand";
import { recipeSchema } from "@/schemas/schema";
import { persist, createJSONStorage } from "zustand/middleware";

type RecipeData = z.infer<typeof recipeSchema>;

interface RecipeStore {
  recipe: RecipeData | null;
  updateRecipe: (recipe: RecipeData | null) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useRecipeStore = create(
  persist<RecipeStore>(
    (set) => ({
      recipe: null,
      updateRecipe: (newRecipe) => {
        set({ recipe: newRecipe });
      },
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "recipe",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
