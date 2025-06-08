import { act } from "react";
import { useCategoryStore } from "~/shared/store/categoryStore";
import { Category } from "~/shared/types/Category";

describe("useCategoryStore", () => {
  const initialCategories: Category[] = [
    { id: 1, name: "Motivación" },
    { id: 2, name: "Trabajo" },
  ];

  beforeEach(() => {
    useCategoryStore.setState({ categories: [] });
  });

  it("tiene estado inicial vacío", () => {
    const state = useCategoryStore.getState();
    expect(state.categories).toEqual([]);
  });

  it("setCategories actualiza todas las categorías", () => {
    act(() => {
      useCategoryStore.getState().setCategories(initialCategories);
    });

    expect(useCategoryStore.getState().categories).toEqual(initialCategories);
  });

  it("addCategory agrega una nueva categoría", () => {
    act(() => {
      useCategoryStore.getState().addCategory({ id: 3, name: "Reflexión" });
    });

    expect(useCategoryStore.getState().categories).toEqual([
      { id: 3, name: "Reflexión" },
    ]);
  });

  it("clearCategories borra todas las categorías", () => {
    act(() => {
      useCategoryStore.getState().setCategories(initialCategories);
      useCategoryStore.getState().clearCategories();
    });

    expect(useCategoryStore.getState().categories).toEqual([]);
  });

  it("updateCategory actualiza una categoría existente", () => {
    act(() => {
      useCategoryStore.getState().setCategories(initialCategories);
      useCategoryStore
        .getState()
        .updateCategory({ id: 1, name: "Actualizada" });
    });

    expect(useCategoryStore.getState().categories).toEqual([
      { id: 1, name: "Actualizada" },
      { id: 2, name: "Trabajo" },
    ]);
  });

  it("updateCategory no modifica si no encuentra el id", () => {
    act(() => {
      useCategoryStore.getState().setCategories(initialCategories);
      useCategoryStore
        .getState()
        .updateCategory({ id: 99, name: "Inexistente" });
    });

    expect(useCategoryStore.getState().categories).toEqual(initialCategories);
  });

  it("removeCategory elimina la categoría por id", () => {
    act(() => {
      useCategoryStore.getState().setCategories(initialCategories);
      useCategoryStore.getState().removeCategory(1);
    });

    expect(useCategoryStore.getState().categories).toEqual([
      { id: 2, name: "Trabajo" },
    ]);
  });

  it("removeCategory no elimina nada si el id no existe", () => {
    act(() => {
      useCategoryStore.getState().setCategories(initialCategories);
      useCategoryStore.getState().removeCategory(99);
    });

    expect(useCategoryStore.getState().categories).toEqual(initialCategories);
  });
});
