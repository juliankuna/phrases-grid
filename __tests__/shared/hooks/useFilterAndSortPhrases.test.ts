import { renderHook } from "@testing-library/react";
import { useFilterAndSortPhrases } from "@hooks/useFilterAndSortPhrases";
import { Phrase } from "~/shared/types/Phrase";

const mockPhrases: Phrase[] = [
  {
    id: 1,
    description: "Frase uno",
    date: new Date("2023-01-01"),
    categoryId: 1,
    isFavorite: false,
  },
  {
    id: 2,
    description: "Frase dos",
    date: new Date("2024-01-01"),
    categoryId: 2,
    isFavorite: true,
  },
  {
    id: 3,
    description: "Frase tres",
    date: new Date("2022-01-01"),
    categoryId: 1,
    isFavorite: true,
  },
];

jest.mock("@store/phraseStore", () => ({
  usePhraseStore: jest.fn((selector) => selector({ phrases: mockPhrases })),
}));

const mockFilters = {
  searchText: "",
  selectedCategory: "all",
  sortOrder: "newest",
};
jest.mock("@store/filterStore", () => ({
  useFiltersStore: jest.fn(() => mockFilters),
}));

describe("useFilterAndSortPhrases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve todas las frases ordenadas por fecha descendente (newest)", () => {
    mockFilters.searchText = "";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "newest";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current.map((p: Phrase) => p.id)).toEqual([2, 1, 3]);
  });

  it("filtra por texto de búsqueda", () => {
    mockFilters.searchText = "dos";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "newest";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].description).toBe("Frase dos");
  });

  it("filtra por categoría", () => {
    mockFilters.searchText = "";
    mockFilters.selectedCategory = "1";
    mockFilters.sortOrder = "newest";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current.map((p: Phrase) => p.id)).toEqual([1, 3]);
  });

  it("ordena por fecha ascendente (oldest)", () => {
    mockFilters.searchText = "";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "oldest";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current.map((p: Phrase) => p.id)).toEqual([3, 1, 2]);
  });

  it("ordena por favoritos", () => {
    mockFilters.searchText = "";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "favorites";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current.map((p: Phrase) => p.id)).toEqual([2, 3, 1]);
  });

  it("retorna sin ordenar si sortOrder es desconocido", () => {
    mockFilters.searchText = "";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "unknown";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current.map((p: Phrase) => p.id)).toEqual([1, 2, 3]);
  });

  it("devuelve array vacío cuando no hay frases que cumplan filtros", () => {
    mockFilters.searchText = "no existe";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "newest";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current).toHaveLength(0);
  });

  it("convierte fechas en string a objeto Date correctamente", () => {
    const mockPhrasesStringDate = [
      {
        id: 10,
        description: "Frase string date",
        date: "2025-06-01T00:00:00.000Z",
        categoryId: 1,
        isFavorite: false,
      },
    ];

    const { usePhraseStore } = require("@store/phraseStore");
    usePhraseStore.mockImplementation((selector: any) =>
      selector({ phrases: mockPhrasesStringDate })
    );

    // filtros neutros para que no filtre nada
    mockFilters.searchText = "";
    mockFilters.selectedCategory = "all";
    mockFilters.sortOrder = "newest";

    const { result } = renderHook(() => useFilterAndSortPhrases());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].date instanceof Date).toBe(true);
    expect(result.current[0].date.toISOString()).toBe(
      "2025-06-01T00:00:00.000Z"
    );
  });
});
