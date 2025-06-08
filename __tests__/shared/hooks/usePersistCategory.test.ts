import { renderHook } from "@testing-library/react";
import {
  useUpdateCategory,
  useCreateCategory,
  useDeleteCategory,
} from "@hooks/usePersistCategory";
import { useBatchMutation } from "@hooks/useBatchMutation";
import { CategoriesService } from "~/shared/services/CategoriesService";

jest.mock("~/shared/services/CategoriesService");
jest.mock("@hooks/useBatchMutation");

describe("Category mutation hooks", () => {
  const mockMutationResult = { mutate: jest.fn(), isLoading: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("useUpdateCategory llama a useBatchMutation con CategoriesService.updateCategory", () => {
    renderHook(() => useUpdateCategory());

    expect(useBatchMutation).toHaveBeenCalledWith(
      CategoriesService.updateCategory
    );
  });

  it("useCreateCategory llama a useBatchMutation con CategoriesService.createCategory", () => {
    renderHook(() => useCreateCategory());

    expect(useBatchMutation).toHaveBeenCalledWith(
      CategoriesService.createCategory
    );
  });

  it("useDeleteCategory llama a useBatchMutation con CategoriesService.deleteCategory", () => {
    renderHook(() => useDeleteCategory());

    expect(useBatchMutation).toHaveBeenCalledWith(
      CategoriesService.deleteCategory
    );
  });

  it("los hooks devuelven el resultado de useBatchMutation", () => {
    const { result: updateResult } = renderHook(() => useUpdateCategory());
    const { result: createResult } = renderHook(() => useCreateCategory());
    const { result: deleteResult } = renderHook(() => useDeleteCategory());

    expect(updateResult.current).toBe(mockMutationResult);
    expect(createResult.current).toBe(mockMutationResult);
    expect(deleteResult.current).toBe(mockMutationResult);
  });
});
