import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DialogNewPhrase from "~/shared/ui/molecules/DialogNewPhrase";

jest.mock("@store/phraseStore", () => ({
  usePhraseStore: jest.fn(),
}));
jest.mock("@store/categoryStore", () => ({
  useCategoryStore: jest.fn(),
}));

jest.mock("@hooks/usePersistPhrase", () => ({
  useCreatePhrase: jest.fn(),
}));

describe("DialogNewPhrase", () => {
  const setIsDialogOpenMock = jest.fn();

  const mockSetPhrases = jest.fn();

  const mockMutateAsync = jest.fn();
  const createPhraseMutation = {
    mutateAsync: mockMutateAsync,
    isPending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const { usePhraseStore } = require("@store/phraseStore");
    usePhraseStore.mockImplementation((selector: any) => {
      if (selector.name === "phrasesSelector") return [];
      if (selector.name === "setPhrasesSelector") return mockSetPhrases;
      return selector({ phrases: [], setPhrases: mockSetPhrases });
    });

    const { useCategoryStore } = require("@store/categoryStore");
    useCategoryStore.mockImplementation((selector: any) =>
      selector({
        categories: [
          { id: 1, name: "Motivación" },
          { id: 2, name: "Humor" },
        ],
      })
    );

    // Mock hook useCreatePhrase
    const { useCreatePhrase } = require("@hooks/usePersistPhrase");
    useCreatePhrase.mockReturnValue(createPhraseMutation);
  });

  it("Renderiza el diálogo con los elementos básicos", () => {
    render(
      <DialogNewPhrase
        isDialogOpen={true}
        setIsDialogOpen={setIsDialogOpenMock}
      />
    );

    expect(screen.getByText("Agregar nueva frase")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Escribe tu frase aquí...")
    ).toBeInTheDocument();
    expect(screen.getByText("Selecciona una categoría")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar frase/i })
    ).toBeDisabled();
  });

  it("Permite escribir frase y seleccionar categoría, habilita botón", () => {
    render(
      <DialogNewPhrase
        isDialogOpen={true}
        setIsDialogOpen={setIsDialogOpenMock}
      />
    );

    const textarea = screen.getByPlaceholderText("Escribe tu frase aquí...");
    fireEvent.change(textarea, { target: { value: "Una frase nueva" } });
    expect(textarea).toHaveValue("Una frase nueva");

    const selectTrigger = screen.getByText("Selecciona una categoría");
    fireEvent.click(selectTrigger);

    const option = screen.getByText("Motivación");
    fireEvent.click(option);

    const button = screen.getByRole("button", { name: /agregar frase/i });
    expect(button).not.toBeDisabled();
  });

  it("Llama a mutación, actualiza store y cierra diálogo al agregar frase", async () => {
    render(
      <DialogNewPhrase
        isDialogOpen={true}
        setIsDialogOpen={setIsDialogOpenMock}
      />
    );

    const textarea = screen.getByPlaceholderText("Escribe tu frase aquí...");
    fireEvent.change(textarea, { target: { value: "Una frase nueva" } });

    const selectTrigger = screen.getByText("Selecciona una categoría");
    fireEvent.click(selectTrigger);
    const option = screen.getByText("Motivación");
    fireEvent.click(option);

    const createdPhrase = {
      id: "1",
      description: "Una frase nueva",
      date: new Date(),
      categoryId: 1,
      isFavorite: false,
    };
    mockMutateAsync.mockResolvedValueOnce(createdPhrase);

    const button = screen.getByRole("button", { name: /agregar frase/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Una frase nueva",
          categoryId: 1,
        })
      );
      expect(mockSetPhrases).toHaveBeenCalledWith(
        expect.arrayContaining([createdPhrase])
      );
      expect(setIsDialogOpenMock).toHaveBeenCalledWith(false);
      expect(textarea).toHaveValue("");
    });
  });

  it("No llama mutación si frase vacía o sin categoría", () => {
    render(
      <DialogNewPhrase
        isDialogOpen={true}
        setIsDialogOpen={setIsDialogOpenMock}
      />
    );

    const button = screen.getByRole("button", { name: /agregar frase/i });
    fireEvent.click(button);

    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(mockSetPhrases).not.toHaveBeenCalled();
    expect(setIsDialogOpenMock).not.toHaveBeenCalled();
  });
});
