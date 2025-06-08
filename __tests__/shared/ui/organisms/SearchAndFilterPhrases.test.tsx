import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchAndFilterPhrases from "@organisms/SearchAndFilterPhrases";

// Mocks para los stores
jest.mock("@store/categoryStore", () => ({
  useCategoryStore: jest.fn(),
}));

jest.mock("@store/filterStore", () => ({
  useFiltersStore: jest.fn(),
}));

describe("SearchAndFilterPhrases", () => {
  const categoriesMock = [
    { id: 1, name: "Categoría 1" },
    { id: 2, name: "Categoría 2" },
  ];

  let setSearchTextMock: jest.Mock;
  let setSelectedCategoryMock: jest.Mock;
  let setSortOrderMock: jest.Mock;

  beforeEach(() => {
    setSearchTextMock = jest.fn();
    setSelectedCategoryMock = jest.fn();
    setSortOrderMock = jest.fn();

    const { useCategoryStore } = require("@store/categoryStore");
    (useCategoryStore as jest.Mock).mockImplementation((selector) =>
      selector({
        categories: categoriesMock,
      })
    );

    const { useFiltersStore } = require("@store/filterStore");
    (useFiltersStore as jest.Mock).mockReturnValue({
      searchText: "test",
      setSearchText: setSearchTextMock,
      selectedCategory: "all",
      setSelectedCategory: setSelectedCategoryMock,
      sortOrder: "newest",
      setSortOrder: setSortOrderMock,
    });
  });

  it("actualiza el texto de búsqueda al cambiar el input", () => {
    render(<SearchAndFilterPhrases />);

    const input = screen.getByPlaceholderText("Buscar en las frases...");
    fireEvent.change(input, { target: { value: "nuevo texto" } });

    expect(setSearchTextMock).toHaveBeenCalledWith("nuevo texto");
  });

  it("cambia la categoría seleccionada", () => {
    render(<SearchAndFilterPhrases />);

    const categorySelectTrigger = screen.getByLabelText("Categoría");
    fireEvent.click(categorySelectTrigger);

    const categoryOption = screen.getByText("Categoría 1");
    fireEvent.click(categoryOption);

    expect(setSelectedCategoryMock).toHaveBeenCalledWith("1");
  });

  it("cambia el orden de filtrado", () => {
    render(<SearchAndFilterPhrases />);

    const orderSelectTrigger = screen.getByLabelText("Ordenar por");
    fireEvent.click(orderSelectTrigger);

    const orderOption = screen.getByText("Más antiguas");
    fireEvent.click(orderOption);

    expect(setSortOrderMock).toHaveBeenCalledWith("oldest");
  });
});
