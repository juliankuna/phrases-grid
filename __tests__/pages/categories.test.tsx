import { render, screen, waitFor, cleanup } from "@testing-library/react";
import * as useInitializeDataHook from "@hooks/useInitializeData";
import * as categoryStore from "@store/categoryStore";
import * as filterHook from "@hooks/useFilterCategories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import CategoriesPage from "~/pages/Categories";

// Limpieza después de cada test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Helper para envolver con QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("CategoriesPage", () => {
  it("muestra el componente de carga mientras isLoading es true", () => {
    jest.spyOn(useInitializeDataHook, "useInitializeData").mockReturnValue({
      isLoading: true,
    });

    renderWithQueryClient(<CategoriesPage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renderiza correctamente la página cuando isLoading es false", async () => {
    const mockCategory = {
      id: 1,
      name: "Categoría de prueba",
    };

    jest.spyOn(useInitializeDataHook, "useInitializeData").mockReturnValue({
      isLoading: false,
    });

    jest.spyOn(categoryStore, "useCategoryStore").mockReturnValue({
      categories: [mockCategory],
    });

    jest.spyOn(filterHook, "useFilterCategories").mockReturnValue([mockCategory]);

    renderWithQueryClient(<CategoriesPage />);

    await waitFor(() => {
      expect(screen.getByText("Tus categorías")).toBeInTheDocument();
      expect(screen.getByText("Categoría de prueba")).toBeInTheDocument();
    });
  });
});
