import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBatchMutation } from "~/shared/hooks/useBatchMutation";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useBatchMutation", () => {
  it("ejecuta la mutación exitosamente", async () => {
    const mockActionFn = jest.fn().mockResolvedValue("response OK");

    const { result } = renderHook(() => useBatchMutation(mockActionFn), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync("input data");
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isPending).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(mockActionFn).toHaveBeenCalledWith("input data");
    });
  });

  it("maneja errores correctamente", async () => {
    const error = new Error("Falló la mutación");
    const mockActionFn = jest.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useBatchMutation(mockActionFn), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.mutateAsync("input fallido");
      } catch (e) {
        // se captura la excepción para no romper el test
      }
    });

    await waitFor(() => {
      expect(mockActionFn).toHaveBeenCalledWith("input fallido");
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(error);
      expect(result.current.isPending).toBe(false);
    });
  });

  it("inicia en estado idle", async () => {
    const mockActionFn = jest.fn();

    const { result } = renderHook(() => useBatchMutation(mockActionFn), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isIdle).toBe(true);
      expect(result.current.isPending).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.isSuccess).toBe(false);
    });
  });
});
