import { renderHook, waitFor } from "@testing-library/react";
import { useGetCategories } from "@hooks/useGetCategories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { CategoriesService } from "~/shared/services/CategoriesService";

const queryClient = new QueryClient();

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetCategories", () => {
  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("debe estar en estado loading inicialmente", () => {
    jest
      .spyOn(CategoriesService, "getCategories")
      .mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useGetCategories(), { wrapper });

    expect(result.current.getCategoriesQuery.isLoading).toBe(true);
  });

  it("debe devolver datos cuando la consulta es exitosa", async () => {
    const mockCategories = [
      { id: 1, name: "Categoría 1" },
      { id: 2, name: "Categoría 2" },
    ];

    jest
      .spyOn(CategoriesService, "getCategories")
      .mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useGetCategories(), { wrapper });

    await waitFor(() => result.current.getCategoriesQuery.isSuccess);

    expect(result.current.getCategoriesQuery.data).toEqual(mockCategories);
    expect(result.current.getCategoriesQuery.isLoading).toBe(false);
  });

  it("debe manejar error cuando la consulta falla", async () => {
    const error = new Error("Error al obtener categorías");

    jest.spyOn(CategoriesService, "getCategories").mockRejectedValue(error);

    const { result } = renderHook(() => useGetCategories(), { wrapper });

    await waitFor(() => result.current.getCategoriesQuery.isError);

    expect(result.current.getCategoriesQuery.error).toBe(error);
    expect(result.current.getCategoriesQuery.isLoading).toBe(false);
  });
});
