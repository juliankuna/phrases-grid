import { render, screen, fireEvent } from "@testing-library/react";
import SearchCategories from "~/shared/ui/organisms/SearchCategories";

const mockSetSearchText = jest.fn();

jest.mock("@store/filterStore", () => ({
  useFiltersStore: () => ({
    searchText: "",
    setSearchText: mockSetSearchText,
  }),
}));

describe("SearchCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el input con el placeholder correcto", () => {
    render(<SearchCategories />);
    const input = screen.getByPlaceholderText("Buscar en las categorías...");
    expect(input).toBeInTheDocument();
  });

  it("llama a setSearchText al cambiar el valor del input", () => {
    render(<SearchCategories />);
    const input = screen.getByPlaceholderText("Buscar en las categorías...");

    fireEvent.change(input, { target: { value: "test" } });

    expect(mockSetSearchText).toHaveBeenCalledWith("test");
  });
});
