import { Category } from "../types/Category"
import { axiosInstance } from "./servicesConfig"

export const CategoriesService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await axiosInstance.get<Category[]>("/categories")
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
  },

  async updateCategory(category: Category): Promise<void> {
    try {
      await axiosInstance.put(`/categories/${category.id}`, category)
    } catch (error) {
      console.error("Error updating categories:", error)
      throw error
    }
  },

  async createCategory(category: Omit<Category, "id">): Promise<Category> {
    try {
      const response = await axiosInstance.post("/categories", category)
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error)
      throw error
    }
  },

  async deleteCategory(categoryId: number): Promise<void> {
    try {
      await axiosInstance.delete(`/categories/${categoryId}`)
    } catch (error) {
      console.error("Error deleting category:", error)
      throw error
    }
  },
}