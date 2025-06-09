import { create } from "zustand";
import { Phrase } from "../types/Phrase";

interface PhraseState {
  phrases: Phrase[];
  setPhrases: (phrases: Phrase[]) => void;
  addPhrase: (phrase: Phrase) => void;
  clearPhrases: () => void;
  updatePhrase: (updatedPhrase: Phrase) => void;
  removePhrase: (id: number) => void;
}

/**
 * Zustand store para gestionar el estado de las frases.
 * Proporciona métodos para añadir, actualizar, eliminar y limpiar frases.
 */
export const usePhraseStore = create<PhraseState>((set) => ({
  phrases: [],
  setPhrases: (phrases) => set({ phrases }),
  addPhrase: (phrase) =>
    set((state) => ({ phrases: [...state.phrases, phrase] })),
  clearPhrases: () => set({ phrases: [] }),
  updatePhrase: (updatedPhrase) =>
    set((state) => ({
      phrases: state.phrases.map((phrase) =>
        phrase.id === updatedPhrase.id ? updatedPhrase : phrase
      ),
    })),
  removePhrase: (id: number) =>
    set((state) => ({
      phrases: state.phrases.filter((p) => p.id !== id),
    })),
}));
