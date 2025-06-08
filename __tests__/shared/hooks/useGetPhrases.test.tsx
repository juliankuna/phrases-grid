import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetPhrases } from "@hooks/useGetPhrases";
import { PhrasesService } from "~/shared/services/PhrasesService";
import { Phrase } from "~/shared/types/Phrase";

jest.mock("~/shared/services/PhrasesService");

const createWrapper = () => {
  const queryClient = new QueryClient();
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return wrapper;
};

describe("useGetPhrases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debe estar en estado loading inicialmente", () => {
    // @ts-ignore
    PhrasesService.getPhrases.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useGetPhrases(), {
      wrapper: createWrapper(),
    });

    expect(result.current.getPhrasesQuery.isLoading).toBe(true);
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

    // @ts-ignore
    PhrasesService.getPhrases.mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetPhrases(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.getPhrasesQuery.isSuccess);

    expect(result.current.getPhrasesQuery.data).toEqual(mockData);
    expect(result.current.getPhrasesQuery.isLoading).toBe(false);
  });

  it("debe manejar errores correctamente", async () => {
    const error = new Error("Error al obtener frases");

    // @ts-ignore
    PhrasesService.getPhrases.mockRejectedValue(error);

    const { result } = renderHook(() => useGetPhrases(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.getPhrasesQuery.isError);

    expect(result.current.getPhrasesQuery.error).toBe(error);
    expect(result.current.getPhrasesQuery.isLoading).toBe(false);
  });
});
