import { renderHook, waitFor, cleanup } from "@testing-library/react";
import { useGetCategories } from "@hooks/useGetCategories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { CategoriesService } from "~/shared/services/CategoriesService";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const createWrapper = (client: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

describe("useGetCategories", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("debe estar en estado loading inicialmente", async () => {
    const queryClient = createTestQueryClient();

    jest
      .spyOn(CategoriesService, "getCategories")
      .mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createWrapper(queryClient),
    });
    await waitFor(() => {
      expect(result.current.getCategoriesQuery.isLoading).toBe(true);
    });
  });

  it("debe devolver datos cuando la consulta es exitosa", async () => {
    const queryClient = createTestQueryClient();

    const mockCategories = [
      { id: 1, name: "Categoría 1" },
      { id: 2, name: "Categoría 2" },
    ];

    jest
      .spyOn(CategoriesService, "getCategories")
      .mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => result.current.getCategoriesQuery.isSuccess);
    await waitFor(() => {
      expect(result.current.getCategoriesQuery.data).toEqual(mockCategories);
      expect(result.current.getCategoriesQuery.isLoading).toBe(false);
    });
  });

  it("debe manejar error cuando la consulta falla", async () => {
    const queryClient = createTestQueryClient();

    const error = new Error("Error al obtener categorías");

    jest.spyOn(CategoriesService, "getCategories").mockRejectedValue(error);

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => result.current.getCategoriesQuery.isError);
    await waitFor(() => {
      expect(result.current.getCategoriesQuery.error).toBeInstanceOf(Error);
      expect(result.current.getCategoriesQuery.error?.message).toBe(
        error.message
      );
      expect(result.current.getCategoriesQuery.isLoading).toBe(false);
    });
  });
});
