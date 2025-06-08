import { renderHook } from "@testing-library/react";
import {
  useUpdatePhrase,
  useCreatePhrase,
  useDeletePhrase,
} from "@hooks/usePersistPhrase";
import { useBatchMutation } from "@hooks/useBatchMutation";
import { PhrasesService } from "~/shared/services/PhrasesService";

jest.mock("~/shared/services/PhrasesService");
jest.mock("@hooks/useBatchMutation");

describe("Phrase mutation hooks", () => {
  const mockMutationResult = { mutate: jest.fn(), isLoading: false };

  beforeEach(() => {
    jest.clearAllMocks();
    (useBatchMutation as jest.Mock).mockReturnValue(mockMutationResult);
  });

  it("useUpdatePhrase llama a useBatchMutation con PhrasesService.updatePhrase", () => {
    renderHook(() => useUpdatePhrase());

    expect(useBatchMutation).toHaveBeenCalledWith(PhrasesService.updatePhrase);
  });

  it("useCreatePhrase llama a useBatchMutation con PhrasesService.createPhrase", () => {
    renderHook(() => useCreatePhrase());

    expect(useBatchMutation).toHaveBeenCalledWith(PhrasesService.createPhrase);
  });

  it("useDeletePhrase llama a useBatchMutation con PhrasesService.deletePhrase", () => {
    renderHook(() => useDeletePhrase());

    expect(useBatchMutation).toHaveBeenCalledWith(PhrasesService.deletePhrase);
  });

  it("los hooks devuelven el resultado de useBatchMutation", () => {
    const { result: updateResult } = renderHook(() => useUpdatePhrase());
    const { result: createResult } = renderHook(() => useCreatePhrase());
    const { result: deleteResult } = renderHook(() => useDeletePhrase());

    expect(updateResult.current).toBe(mockMutationResult);
    expect(createResult.current).toBe(mockMutationResult);
    expect(deleteResult.current).toBe(mockMutationResult);
  });
});
