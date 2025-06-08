import { useEffect } from "react";
import { useGetCategories } from "@hooks/useGetCategories";
import { useGetPhrases } from "@hooks/useGetPhrases";
import { usePhraseStore } from "@store/phraseStore";
import { useCategoryStore } from "@store/categoryStore";

/**
 * Custom hook para inicializar datos desde el backend.
 * Obtiene frases y categorías y actualiza las stores Zustand.
 * @returns {Object} - Un objeto que contiene el estado de carga de los datos
 */
export function useInitializeData() {
  const { getCategoriesQuery } = useGetCategories();
  const { getPhrasesQuery } = useGetPhrases();

  const phrases = usePhraseStore((state) => state.phrases);
  const setPhrases = usePhraseStore((state) => state.setPhrases);

  const categories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    if (getPhrasesQuery.data && phrases.length === 0) {
      const phrasesWithDate = getPhrasesQuery.data.map((phrase) => ({
        ...phrase,
        date: new Date(phrase.date),
      }));
      setPhrases(phrasesWithDate);
    }
  }, [getPhrasesQuery.data, phrases.length, setPhrases]);

  useEffect(() => {
    if (getCategoriesQuery.data && categories.length === 0) {
      setCategories(getCategoriesQuery.data);
    }
  }, [getCategoriesQuery.data, categories.length, setCategories]);

  return {
    isLoading: getCategoriesQuery.isLoading || getPhrasesQuery.isLoading,
  };
}
