"use client";

import { useInitializeData } from "@hooks/useInitializeData";
import { useFilterAndSortPhrases } from "@hooks/useFilterAndSortPhrases";
import SearchAndFilterPhrases from "@organisms/SearchAndFilterPhrases";
import ResultsSummary from "@molecules/ResultsSummary";
import PhrasesGrid from "@organisms/PhrasesGrid";
import Loading from "@atoms/loading";
import { usePhraseStore } from "@store/phraseStore";
import DialogNewPhrase from "@molecules/DialogNewPhrase";
import TopSection from "@organisms/TopSection";

export function HomePage() {
  //Cargando los datos iniciales de frases y categorías desde el backend json-server
  const { isLoading } = useInitializeData();

  //Gestión de frases y categorías mediante las stores de Zustand
  const phrases = usePhraseStore((state) => state.phrases);

  const filteredAndSortedPhrases = useFilterAndSortPhrases();

  if (isLoading ) return <Loading />;

  return (
    <div className="flex flex-col">
      <main className="flex-grow container mx-auto p-6 max-w-6xl">
        <TopSection
          title="Tus frases"
          description="Gestiona las frases a tu gusto y destaca tus favoritas"
          dialogTriggerLabel="Agregar Frase"
          DialogComponent={DialogNewPhrase}
        />
        <SearchAndFilterPhrases />
        <ResultsSummary
          filtered={filteredAndSortedPhrases.length}
          total={phrases.length}
        />
        <PhrasesGrid phrases={filteredAndSortedPhrases} />
      </main>
    </div>
  );
}