import { renderHook } from "@testing-library/react";
import { useInitializeData } from "@hooks/useInitializeData";

// Mocks de dependencias
jest.mock("@hooks/useGetCategories", () => ({
  useGetCategories: jest.fn(),
}));

jest.mock("@hooks/useGetPhrases", () => ({
  useGetPhrases: jest.fn(),
}));

const mockSetPhrases = jest.fn();
const mockSetCategories = jest.fn();

jest.mock("@store/phraseStore", () => ({
  usePhraseStore: jest.fn((selector) =>
    selector({ phrases: [], setPhrases: mockSetPhrases })
  ),
}));

jest.mock("@store/categoryStore", () => ({
  useCategoryStore: jest.fn((selector) =>
    selector({ categories: [], setCategories: mockSetCategories })
  ),
}));

describe("useInitializeData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe setear frases si hay data y phrases está vacío", () => {
    const mockData = [
      { id: 1, text: "Hola", date: new Date("2023-01-01") },
      { id: 2, text: "Mundo", date: new Date("2023-01-02") },
    ];

    require("@hooks/useGetPhrases").useGetPhrases.mockReturnValue({
      getPhrasesQuery: { data: mockData, isLoading: false },
    });
    require("@hooks/useGetCategories").useGetCategories.mockReturnValue({
      getCategoriesQuery: { data: undefined, isLoading: false },
    });

    renderHook(() => useInitializeData());

    expect(mockSetPhrases).toHaveBeenCalledWith([
      { id: 1, text: "Hola", date: new Date("2023-01-01") },
      { id: 2, text: "Mundo", date: new Date("2023-01-02") },
    ]);
  });

  it("no debe setear frases si phrases ya contiene data", () => {
    require("@store/phraseStore").usePhraseStore.mockImplementation(
      (selector: any) =>
        selector({
          phrases: [{ id: 1, text: "Hola", date: new Date() }],
          setPhrases: mockSetPhrases,
        })
    );

    require("@hooks/useGetPhrases").useGetPhrases.mockReturnValue({
      getPhrasesQuery: {
        data: [{ id: 1, text: "Hola", date: new Date("2023-01-01") }],
        isLoading: false,
      },
    });

    require("@hooks/useGetCategories").useGetCategories.mockReturnValue({
      getCategoriesQuery: { data: undefined, isLoading: false },
    });

    renderHook(() => useInitializeData());

    expect(mockSetPhrases).not.toHaveBeenCalled();
  });

  it("debe setear categorías si hay data y categories está vacío", () => {
    const mockCategories = [{ id: 1, name: "Saludo" }];

    require("@hooks/useGetPhrases").useGetPhrases.mockReturnValue({
      getPhrasesQuery: { data: undefined, isLoading: false },
    });

    require("@hooks/useGetCategories").useGetCategories.mockReturnValue({
      getCategoriesQuery: { data: mockCategories, isLoading: false },
    });

    renderHook(() => useInitializeData());

    expect(mockSetCategories).toHaveBeenCalledWith(mockCategories);
  });

  it("no debe setear categorías si categories ya contiene data", () => {
    const mockCategories = [
      { id: 1, text: "Hola", date: new Date("2023-01-01") },
    ];

    require("@store/categoryStore").useCategoryStore.mockImplementation(
      (selector: any) =>
        selector({
          categories: mockCategories,
          setCategories: mockSetCategories,
        })
    );

    require("@hooks/useGetPhrases").useGetPhrases.mockReturnValue({
      getPhrasesQuery: { data: undefined, isLoading: false },
    });

    require("@hooks/useGetCategories").useGetCategories.mockReturnValue({
      getCategoriesQuery: { data: mockCategories, isLoading: false },
    });

    renderHook(() => useInitializeData());

    expect(mockSetCategories).not.toHaveBeenCalled();
  });

  it("debe retornar isLoading en true si alguna query está cargando", () => {
    require("@hooks/useGetPhrases").useGetPhrases.mockReturnValue({
      getPhrasesQuery: { data: undefined, isLoading: true },
    });

    require("@hooks/useGetCategories").useGetCategories.mockReturnValue({
      getCategoriesQuery: { data: undefined, isLoading: false },
    });

    const { result } = renderHook(() => useInitializeData());

    expect(result.current.isLoading).toBe(true);
  });

  it("debe retornar isLoading en false si ambas queries no están cargando", () => {
    require("@hooks/useGetPhrases").useGetPhrases.mockReturnValue({
      getPhrasesQuery: { data: undefined, isLoading: false },
    });

    require("@hooks/useGetCategories").useGetCategories.mockReturnValue({
      getCategoriesQuery: { data: undefined, isLoading: false },
    });

    const { result } = renderHook(() => useInitializeData());

    expect(result.current.isLoading).toBe(false);
  });
});
