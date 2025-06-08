import { CategoriesService } from "~/shared/services/CategoriesService";
import { axiosInstance } from "~/shared/services/servicesConfig";
import { Category } from "~/shared/types/Category";

jest.mock("~/shared/services/servicesConfig", () => ({
  axiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("CategoriesService", () => {
  const mockCategory: Category = {
    id: 1,
    name: "Motivación",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCategories", () => {
    it("debe obtener categorías correctamente", async () => {
      const mockData = [mockCategory];
      (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await CategoriesService.getCategories();
      expect(axiosInstance.get).toHaveBeenCalledWith("/categories");
      expect(result).toEqual(mockData);
    });

    it("debe lanzar error si falla la petición", async () => {
      const error = new Error("Error al obtener categorías");
      (axiosInstance.get as jest.Mock).mockRejectedValue(error);

      await expect(CategoriesService.getCategories()).rejects.toThrow(error);
    });
  });

  describe("createCategory", () => {
    it("debe crear una categoría correctamente", async () => {
      const categoryWithoutId = {
        name: "Inspiración",
      };
      const responseData = { id: 99, ...categoryWithoutId };
      (axiosInstance.post as jest.Mock).mockResolvedValue({
        data: responseData,
      });

      const result = await CategoriesService.createCategory(categoryWithoutId);
      expect(axiosInstance.post).toHaveBeenCalledWith(
        "/categories",
        categoryWithoutId
      );
      expect(result).toEqual(responseData);
    });

    it("debe lanzar error si falla la creación", async () => {
      const error = new Error("Error al crear categoría");
      (axiosInstance.post as jest.Mock).mockRejectedValue(error);

      await expect(
        CategoriesService.createCategory({ name: "Fallo" })
      ).rejects.toThrow(error);
    });
  });

  describe("updateCategory", () => {
    it("debe actualizar una categoría correctamente", async () => {
      (axiosInstance.put as jest.Mock).mockResolvedValue({});

      await CategoriesService.updateCategory(mockCategory);
      expect(axiosInstance.put).toHaveBeenCalledWith(
        `/categories/${mockCategory.id}`,
        mockCategory
      );
    });

    it("debe lanzar error si falla la actualización", async () => {
      const error = new Error("Error actualizando categoría");
      (axiosInstance.put as jest.Mock).mockRejectedValue(error);

      await expect(
        CategoriesService.updateCategory(mockCategory)
      ).rejects.toThrow(error);
    });
  });

  describe("deleteCategory", () => {
    it("debe eliminar una categoría correctamente", async () => {
      (axiosInstance.delete as jest.Mock).mockResolvedValue({});

      await CategoriesService.deleteCategory(mockCategory.id);
      expect(axiosInstance.delete).toHaveBeenCalledWith(
        `/categories/${mockCategory.id}`
      );
    });

    it("debe lanzar error si falla el borrado", async () => {
      const error = new Error("Error al eliminar categoría");
      (axiosInstance.delete as jest.Mock).mockRejectedValue(error);

      await expect(
        CategoriesService.deleteCategory(mockCategory.id)
      ).rejects.toThrow(error);
    });
  });
});
