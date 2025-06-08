import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetPhrases } from "@hooks/useGetPhrases";
import { PhrasesService } from "~/shared/services/PhrasesService";
import { Phrase } from "~/shared/types/Phrase";

jest.mock("~/shared/services/PhrasesService");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return wrapper;
};

describe("useGetPhrases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debe estar en estado loading inicialmente", async () => {
    // Mock para testear loading
    (PhrasesService.getPhrases as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useGetPhrases(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.getPhrasesQuery.isLoading).toBe(true);
    });
  });

  it("debe devolver datos exitosamente", async () => {
    const mockData: Phrase[] = [
      {
        id: 1,
        description: "Frase inspiradora",
        date: new Date("2024-01-01"),
        categoryId: 1,
        isFavorite: false,
      },
      {
        id: 2,
        description: "Otra frase motivadora",
        date: new Date("2024-02-01"),
        categoryId: 2,
        isFavorite: true,
      },
    ];

    (PhrasesService.getPhrases as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetPhrases(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.getPhrasesQuery.isSuccess).toBe(true);
    });

    expect(result.current.getPhrasesQuery.data).toEqual(mockData);
    expect(result.current.getPhrasesQuery.isLoading).toBe(false);
  });

  it("debe manejar errores correctamente", async () => {
    const errorMessage = "Error al obtener frases";
    const error = new Error(errorMessage);

    (PhrasesService.getPhrases as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useGetPhrases(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.getPhrasesQuery.isError).toBe(true);
    });

    const errorResult = result.current.getPhrasesQuery.error;

    expect(errorResult).toBeInstanceOf(Error);
    expect((errorResult as Error).message).toBe(errorMessage);
    expect(result.current.getPhrasesQuery.isLoading).toBe(false);
  });
});
