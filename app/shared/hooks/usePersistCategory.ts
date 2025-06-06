import { CategoriesService } from "../services/CategoriesService";
import { Category } from "../types/Category";
import { useBatchMutation } from "./useBatchMutation"

export const useUpdateCategory = () => {
  return useBatchMutation<Category>(CategoriesService.updateCategory);
}

export const useCreateCategory = () => {
  return useBatchMutation<Omit<Category, "id">, Category>(CategoriesService.createCategory);
}

export const useDeleteCategory = () => {
  return useBatchMutation<number>(CategoriesService.deleteCategory);
}