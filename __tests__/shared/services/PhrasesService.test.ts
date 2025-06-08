import { PhrasesService } from "~/shared/services/PhrasesService";
import { axiosInstance } from "~/shared/services/servicesConfig";
import { Phrase } from "~/shared/types/Phrase";

jest.mock("~/shared/services/servicesConfig", () => ({
  axiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("PhrasesService", () => {
  const mockPhrase: Phrase = {
    id: 1,
    description: "Frase de prueba",
    date: new Date("2024-01-01"),
    categoryId: 2,
    isFavorite: true,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPhrases", () => {
    it("debe obtener frases correctamente", async () => {
      const mockData = [mockPhrase];
      (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await PhrasesService.getPhrases();
      expect(axiosInstance.get).toHaveBeenCalledWith("/phrases");
      expect(result).toEqual(mockData);
    });

    it("debe lanzar error si falla la petición", async () => {
      const error = new Error("Error");
      (axiosInstance.get as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      await expect(PhrasesService.getPhrases()).rejects.toThrow(error);
      consoleSpy.mockRestore();
    });
  });

  describe("createPhrase", () => {
    it("debe crear una frase correctamente", async () => {
      const phraseWithoutId = {
        description: "Nueva frase",
        date: new Date("2024-02-01"),
        categoryId: 1,
        isFavorite: false,
      };
      const responseData = { id: 99, ...phraseWithoutId };
      (axiosInstance.post as jest.Mock).mockResolvedValue({
        data: responseData,
      });

      const result = await PhrasesService.createPhrase(phraseWithoutId);
      expect(axiosInstance.post).toHaveBeenCalledWith(
        "/phrases",
        phraseWithoutId
      );
      expect(result).toEqual(responseData);
    });

    it("debe lanzar error si falla la creación", async () => {
      const error = new Error("Error creando frase");
      (axiosInstance.post as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      await expect(
        PhrasesService.createPhrase({
          description: "Frase fallida",
          date: new Date(),
          categoryId: 1,
          isFavorite: false,
        })
      ).rejects.toThrow(error);
      consoleSpy.mockRestore();
    });
  });

  describe("updatePhrase", () => {
    it("debe actualizar una frase correctamente", async () => {
      (axiosInstance.put as jest.Mock).mockResolvedValue({});

      await PhrasesService.updatePhrase(mockPhrase);
      expect(axiosInstance.put).toHaveBeenCalledWith(
        `/phrases/${mockPhrase.id}`,
        mockPhrase
      );
    });

    it("debe lanzar error si falla la actualización", async () => {
      const error = new Error("Error actualizando");
      (axiosInstance.put as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      await expect(PhrasesService.updatePhrase(mockPhrase)).rejects.toThrow(
        error
      );
      consoleSpy.mockRestore();
    });
  });

  describe("deletePhrase", () => {
    it("debe eliminar una frase correctamente", async () => {
      (axiosInstance.delete as jest.Mock).mockResolvedValue({});

      await PhrasesService.deletePhrase(mockPhrase.id);
      expect(axiosInstance.delete).toHaveBeenCalledWith(
        `/phrases/${mockPhrase.id}`
      );
    });

    it("debe lanzar error si falla el borrado", async () => {
      const error = new Error("Error eliminando");
      (axiosInstance.delete as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      await expect(PhrasesService.deletePhrase(mockPhrase.id)).rejects.toThrow(
        error
      );
      consoleSpy.mockRestore();
    });
  });
});
