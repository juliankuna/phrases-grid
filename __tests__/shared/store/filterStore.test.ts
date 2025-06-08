import { act } from "react";
import { useFiltersStore } from "~/shared/store/filterStore";

describe("useFiltersStore", () => {
  beforeEach(() => {
    useFiltersStore.setState({
      searchText: "",
      selectedCategory: "all",
      sortOrder: "newest",
    });
  });

  it("tiene estado inicial correcto", () => {
    const state = useFiltersStore.getState();
    expect(state.searchText).toBe("");
    expect(state.selectedCategory).toBe("all");
    expect(state.sortOrder).toBe("newest");
  });

  it("setSearchText actualiza el texto de búsqueda", () => {
    act(() => {
      useFiltersStore.getState().setSearchText("inspiración");
    });

    expect(useFiltersStore.getState().searchText).toBe("inspiración");
  });

  it("setSelectedCategory actualiza la categoría seleccionada", () => {
    act(() => {
      useFiltersStore.getState().setSelectedCategory("trabajo");
    });

    expect(useFiltersStore.getState().selectedCategory).toBe("trabajo");
  });

  it("setSortOrder actualiza el orden de los resultados", () => {
    act(() => {
      useFiltersStore.getState().setSortOrder("oldest");
    });

    expect(useFiltersStore.getState().sortOrder).toBe("oldest");
  });
});
