import { act } from "react-dom/test-utils";
import { usePhraseStore } from "~/shared/store/phraseStore";
import { Phrase } from "~/shared/types/Phrase";

describe("usePhraseStore", () => {
  const initialPhrase: Phrase = {
    id: 1,
    description: "Frase inicial",
    date: new Date("2024-01-01"),
    categoryId: 10,
    isFavorite: false,
  };

  const anotherPhrase: Phrase = {
    id: 2,
    description: "Otra frase",
    date: new Date("2024-02-02"),
    categoryId: 20,
    isFavorite: true,
  };

  beforeEach(() => {
    usePhraseStore.setState({ phrases: [] });
  });

  it("tiene estado inicial vacío", () => {
    const state = usePhraseStore.getState();
    expect(state.phrases).toEqual([]);
  });

  it("setPhrases actualiza el estado completo", () => {
    act(() => {
      usePhraseStore.getState().setPhrases([initialPhrase, anotherPhrase]);
    });
    expect(usePhraseStore.getState().phrases).toEqual([
      initialPhrase,
      anotherPhrase,
    ]);
  });

  it("addPhrase agrega una nueva frase", () => {
    act(() => {
      usePhraseStore.getState().addPhrase(initialPhrase);
    });
    expect(usePhraseStore.getState().phrases).toEqual([initialPhrase]);
  });

  it("clearPhrases elimina todas las frases", () => {
    act(() => {
      usePhraseStore.getState().setPhrases([initialPhrase, anotherPhrase]);
      usePhraseStore.getState().clearPhrases();
    });
    expect(usePhraseStore.getState().phrases).toEqual([]);
  });

  it("updatePhrase modifica una frase existente", () => {
    const updated = { ...initialPhrase, description: "Actualizada" };

    act(() => {
      usePhraseStore.getState().setPhrases([initialPhrase]);
      usePhraseStore.getState().updatePhrase(updated);
    });

    expect(usePhraseStore.getState().phrases).toEqual([updated]);
  });

  it("updatePhrase no hace nada si no existe el id", () => {
    act(() => {
      usePhraseStore.getState().setPhrases([initialPhrase]);
      usePhraseStore.getState().updatePhrase(anotherPhrase); // id = 2, no existe
    });

    expect(usePhraseStore.getState().phrases).toEqual([initialPhrase]);
  });

  it("removePhrase elimina una frase por id", () => {
    act(() => {
      usePhraseStore.getState().setPhrases([initialPhrase, anotherPhrase]);
      usePhraseStore.getState().removePhrase(1);
    });

    expect(usePhraseStore.getState().phrases).toEqual([anotherPhrase]);
  });

  it("removePhrase no hace nada si el id no existe", () => {
    act(() => {
      usePhraseStore.getState().setPhrases([initialPhrase]);
      usePhraseStore.getState().removePhrase(999);
    });

    expect(usePhraseStore.getState().phrases).toEqual([initialPhrase]);
  });
});