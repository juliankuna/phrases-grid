import { usePhraseStore } from "@store/phraseStore";
import { useFiltersStore } from "@store/filterStore";

export function useFilterAndSortPhrases() {
  const phrases = usePhraseStore((state) => state.phrases);
  const { searchText, selectedCategory, sortOrder } = useFiltersStore();

  return phrases
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
