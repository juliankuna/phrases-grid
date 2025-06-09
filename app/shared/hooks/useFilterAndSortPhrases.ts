import { usePhraseStore } from "@store/phraseStore";
import { useFiltersStore } from "@store/filterStore";

/**
 * Custom hook para filtrar y ordenar las frases según los criterios de búsqueda,
 * categoría seleccionada y orden de clasificación que haya seleccionado el usuario.
 */
export function useFilterAndSortPhrases() {
  const phrases = usePhraseStore((state) => state.phrases);
  const { searchText, selectedCategory, sortOrder } = useFiltersStore();

  const phrasesWithDate = phrases.map((p) => ({
        ...p,
        date: new Date(p.date), // Conversión para asegurar que date sea un objeto Date
      }));

  return phrasesWithDate
    .filter((phrase) => {
      const matchesSearch = phrase.description
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        phrase.categoryId.toString() === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return b.date.getTime() - a.date.getTime();
        case "oldest":
          return a.date.getTime() - b.date.getTime();
        case "favorites":
          return b.isFavorite === a.isFavorite ? 0 : b?.isFavorite ? 1 : -1;
        default:
          return 0;
      }
    });
}
