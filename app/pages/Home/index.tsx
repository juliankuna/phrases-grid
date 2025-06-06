"use client";

import { useInitializeData } from "@hooks/useInitializeData";
import { useFilterAndSortPhrases } from "@hooks/useFilterAndSortPhrases";
import TopPhraseSection from "~/shared/ui/organisms/TopPhraseSection";
import SearchAndFilters from "@organisms/SearchAndFilters";
import ResultsSummary from "@molecules/ResultsSummary";
import PhrasesGrid from "@organisms/PhrasesGrid";
import Loading from "@atoms/loading";
import { useCategoryStore } from "@store/categoryStore";
import { usePhraseStore } from "@store/phraseStore";
import Footer from "@organisms/Footer";

export function HomePage() {
  //Cargando los datos iniciales de frases y categorías desde el backend json-server
  const { isLoading } = useInitializeData();

  //Gestión de frases y categorías mediante las stores de Zustand 
  const phrases = usePhraseStore((state) => state.phrases);
  const categories = useCategoryStore((state) => state.categories);

  const filteredAndSortedPhrases = useFilterAndSortPhrases();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col" >
      <main className="flex-grow container mx-auto p-6 max-w-6xl">      
        <TopPhraseSection />
        <SearchAndFilters />
        <ResultsSummary
          filtered={filteredAndSortedPhrases.length}
          total={phrases.length}
        />
        <PhrasesGrid phrases={filteredAndSortedPhrases} categories={categories} />
      </main>
    </div>
  );
}