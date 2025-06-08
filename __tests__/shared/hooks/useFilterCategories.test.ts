import { useFiltersStore } from "@store/filterStore";
import { useCategoryStore } from "@store/categoryStore";
import { useFilterCategories } from "~/shared/hooks/useFilterCategories";
import { Category } from "~/shared/types/Category";

jest.mock("@store/filterStore");
jest.mock("@store/categoryStore");

const mockedUseFiltersStore = useFiltersStore as unknown as jest.Mock;
const mockedUseCategoryStore = useCategoryStore as unknown as jest.Mock;

describe("useFilterCategories", () => {
  const mockCategories: Category[] = [
    { id: 1, name: "Motivación" },
    { id: 2, name: "Reflexión" },
    { id: 3, name: "Trabajo" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve todas las categorías si searchText está vacío", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "" });
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual(mockCategories);
  });

  it("filtra las categorías si searchText coincide parcialmente", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "mo" });
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual([{ id: 1, name: "Motivación" }]);
  });

  it("es insensible a mayúsculas/minúsculas", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "TRABAJO" });
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual([{ id: 3, name: "Trabajo" }]);
  });

  it("devuelve un array vacío si no hay coincidencias", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "noexiste" });
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual([]);
  });

  it("devuelve un array vacío si categories es undefined", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "" });
    mockedUseCategoryStore.mockReturnValue(undefined);

    const result = useFilterCategories();

    expect(result).toEqual([]);
  });

  it("devuelve un array vacío si categories es null", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "" });
    mockedUseCategoryStore.mockReturnValue(null);

    const result = useFilterCategories();

    expect(result).toEqual([]);
  });

  it("maneja searchText como undefined (debe considerarlo como '')", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: undefined });
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual(mockCategories);
  });

  it("maneja searchText como null (debe considerarlo como '')", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: null });
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual(mockCategories);
  });

  it("maneja categories como array vacío", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "mo" });
    mockedUseCategoryStore.mockReturnValue([]);

    const result = useFilterCategories();

    expect(result).toEqual([]);
  });

  it("devuelve múltiples categorías si coinciden con el searchText", () => {
    mockedUseFiltersStore.mockReturnValue({ searchText: "ión" }); // Motivación y Reflexión
    mockedUseCategoryStore.mockReturnValue(mockCategories);

    const result = useFilterCategories();

    expect(result).toEqual([
      { id: 1, name: "Motivación" },
      { id: 2, name: "Reflexión" },
    ]);
  });
});
