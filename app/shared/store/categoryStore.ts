import { create } from "zustand";
import { Category } from "../types/Category";

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  clearCategories: () => void;
  updateCategory: (updatedCategory: Category) => void;
  removeCategory: (id: number) => void;
}

/**
 * Zustand store para gestionar el estado de las categorías.
 * Proporciona métodos para añadir, actualizar, eliminar y limpiar categorías.
 */
export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  clearCategories: () => set({ categories: [] }),
  updateCategory: (updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    })),
  removeCategory: (id: number) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));
