import { useEffect } from "react";
import { useGetCategories } from "@hooks/useGetCategories";
import { useGetPhrases } from "@hooks/useGetPhrases";
import { usePhraseStore } from "@store/phraseStore";
import { useCategoryStore } from "@store/categoryStore";

export function useInitializeData() {
  const { getCategoriesQuery } = useGetCategories();
  const { getPhrasesQuery } = useGetPhrases();
  const setPhrases = usePhraseStore((state) => state.setPhrases);
  const setCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    if (getPhrasesQuery.data) {
      const phrasesWithDate = getPhrasesQuery.data.map((phrase) => ({
        ...phrase,
        date: new Date(phrase.date),
      }));
      setPhrases(phrasesWithDate);
    }
  }, [getPhrasesQuery.data, setPhrases]);

  useEffect(() => {
    if (getCategoriesQuery.data) {
      setCategories(getCategoriesQuery.data);
    }
  }, [getCategoriesQuery.data, setCategories]);

  return {
    isLoading: getCategoriesQuery.isLoading || getPhrasesQuery.isLoading,
  };
}
