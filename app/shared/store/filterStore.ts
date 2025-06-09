import { create } from 'zustand';

interface FiltersState {
  searchText: string;
  selectedCategory: string;
  sortOrder: string;
  setSearchText: (text: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortOrder: (order: string) => void;
}

/**
 * Zustand store para gestionar el estado de los filtros y ordenamientos elegidos por el usuario.
 * Proporciona métodos para actualizar el texto de búsqueda, 
 * la categoría seleccionada y el orden de clasificación.
 */
export const useFiltersStore = create<FiltersState>((set) => ({
  searchText: '',
  selectedCategory: 'all',
  sortOrder: 'newest',
  setSearchText: (text) => set({ searchText: text }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortOrder: (order) => set({ sortOrder: order }),
}));
