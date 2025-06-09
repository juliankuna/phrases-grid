import { useFiltersStore } from "@store/filterStore";
import { useCategoryStore } from "@store/categoryStore";

//Custom hook para filtrar las castegorías según los caracteres que haya tipeado el usuario.
export function useFilterCategories() {
  const categories = useCategoryStore((state) => state.categories) ?? [];
  const { searchText } = useFiltersStore();

  return categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes((searchText ?? "").toLowerCase());

    return matchesSearch;
  });
}
