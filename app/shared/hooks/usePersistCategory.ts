import { CategoriesService } from "../services/CategoriesService";
import { Category } from "../types/Category";
import { useBatchMutation } from "./useBatchMutation"

/**
 * Custom hooks para gestionar la persistencia de categorías empleando el custom hook useBatchMutation
 * Estos hooks permiten crear, actualizar y eliminar categorías mediante el servicio CategoriesService.
 * */

export const useUpdateCategory = () => {
  return useBatchMutation<Category>(CategoriesService.updateCategory);
}

export const useCreateCategory = () => {
  return useBatchMutation<Omit<Category, "id">, Category>(CategoriesService.createCategory);
}

export const useDeleteCategory = () => {
  return useBatchMutation<number>(CategoriesService.deleteCategory);
}