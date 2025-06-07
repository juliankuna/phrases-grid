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
