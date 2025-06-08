import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { HomePage } from "../../app/pages/Home";
import * as useInitializeDataHook from "@hooks/useInitializeData";
import * as phraseStore from "@store/phraseStore";
import * as filterHook from "@hooks/useFilterAndSortPhrases";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Asegura limpieza después de cada test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Helper para envolver con el QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("HomePage", () => {
  it("muestra el componente de carga mientras isLoading es true", () => {
    jest.spyOn(useInitializeDataHook, "useInitializeData").mockReturnValue({
      isLoading: true,
    });

    renderWithQueryClient(<HomePage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

    it("renderiza correctamente la página una vez que isLoading es false", async () => {
    const mockPhrase = {
      id: 1,
      description: "Frase de prueba",
      date: new Date(),
      categoryId: 1,
      isFavorite: false,
    };

    jest.spyOn(useInitializeDataHook, "useInitializeData").mockReturnValue({
      isLoading: false,
    });

    jest.spyOn(phraseStore, "usePhraseStore").mockReturnValue({
      phrases: [mockPhrase],
    });

    jest.spyOn(filterHook, "useFilterAndSortPhrases").mockReturnValue([
      mockPhrase,
    ]);

    renderWithQueryClient(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Tus frases")).toBeInTheDocument();
      expect(screen.getByText("Frase de prueba")).toBeInTheDocument();
    });
  });

});
