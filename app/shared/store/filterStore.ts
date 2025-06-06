import { create } from 'zustand';

interface FiltersState {
  searchText: string;
  selectedCategory: string;
  sortOrder: string;
  setSearchText: (text: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortOrder: (order: string) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  searchText: '',
  selectedCategory: 'all',
  sortOrder: 'newest',
  setSearchText: (text) => set({ searchText: text }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortOrder: (order) => set({ sortOrder: order }),
}));
