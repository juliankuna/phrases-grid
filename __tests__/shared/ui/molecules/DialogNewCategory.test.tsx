import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DialogNewCategory from "@molecules/DialogNewCategory";

jest.mock("@store/categoryStore", () => ({
  useCategoryStore: jest.fn(),
}));

jest.mock("@hooks/usePersistCategory", () => ({
  useCreateCategory: jest.fn(),
}));

describe("DialogNewCategory", () => {
  const setIsDialogOpenMock = jest.fn();

  // Variables para mocks
  const mockSetCategories = jest.fn();
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const { useCategoryStore } = require("@store/categoryStore");
    useCategoryStore.mockImplementation((selector:any) => {
      if (selector.name === "categoriesSelector") return [];
      if (selector.name === "setCategoriesSelector") return mockSetCategories;
      // fallback para evitar errores si hay otras llamadas
      return selector({ categories: [], setCategories: mockSetCategories });
    });

    const { useCreateCategory } = require("@hooks/usePersistCategory");
    useCreateCategory.mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
  });

  it("Renderiza y muestra elementos básicos cuando está abierto", () => {
    render(
      <DialogNewCategory isDialogOpen={true} setIsDialogOpen={setIsDialogOpenMock} />
    );

    expect(screen.getByText("Agregar nueva categoría")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ej: Motivación")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /agregar categoría/i })).toBeDisabled();
  });

  it("Permite escribir en el input y habilita el botón", () => {
    render(
      <DialogNewCategory isDialogOpen={true} setIsDialogOpen={setIsDialogOpenMock} />
    );

    const input = screen.getByPlaceholderText("Ej: Motivación");
    fireEvent.change(input, { target: { value: "Nueva categoría" } });

    expect(input).toHaveValue("Nueva categoría");

    const button = screen.getByRole("button", { name: /agregar categoría/i });
    expect(button).not.toBeDisabled();
  });

  it("Llama a la mutación, actualiza store y cierra el diálogo al agregar categoría", async () => {
    render(
      <DialogNewCategory isDialogOpen={true} setIsDialogOpen={setIsDialogOpenMock} />
    );

    const input = screen.getByPlaceholderText("Ej: Motivación");
    const button = screen.getByRole("button", { name: /agregar categoría/i });

    // Simular escribir
    fireEvent.change(input, { target: { value: "Nueva categoría" } });

    // Mock de la respuesta de la mutación
    const createdCategory = { id: "123", name: "Nueva categoría" };
    mockMutateAsync.mockResolvedValueOnce(createdCategory);

    // Click en agregar
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({ name: "Nueva categoría" });
      expect(mockSetCategories).toHaveBeenCalledWith(expect.arrayContaining([createdCategory]));
      expect(setIsDialogOpenMock).toHaveBeenCalledWith(false);
      expect(input).toHaveValue("");
    });
  });

  it("No llama a mutación si input está vacío o solo espacios", () => {
    render(
      <DialogNewCategory isDialogOpen={true} setIsDialogOpen={setIsDialogOpenMock} />
    );

    const input = screen.getByPlaceholderText("Ej: Motivación");
    const button = screen.getByRole("button", { name: /agregar categoría/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(mockSetCategories).not.toHaveBeenCalled();
    expect(setIsDialogOpenMock).not.toHaveBeenCalledWith(false);
  });
});
