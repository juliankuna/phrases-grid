import { create } from 'zustand'
import { Category } from '../types/Category'

interface CategoryState {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  clearCategories: () => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  clearCategories: () => set({ categories: [] }),
}))