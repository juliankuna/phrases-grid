import { render, screen, fireEvent } from "@testing-library/react";
import TopPhraseSection from "~/shared/ui/organisms/TopPhraseSection";

jest.mock("@molecules/DialogNewPhrase", () => (props: any) => {
  return props.isDialogOpen ? <div>Dialog abierto</div> : null;
});

describe("TopPhraseSection", () => {
  it("renderiza título, párrafo y botón", () => {
    render(<TopPhraseSection />);

    expect(screen.getByRole("heading", { name: /tus frases/i })).toBeInTheDocument();
    expect(screen.getByText(/gestiona las frases a tu gusto/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /agregar frase/i })).toBeInTheDocument();
  });

  it("abre el Dialog al hacer clic en el botón", () => {
    render(<TopPhraseSection />);

    const button = screen.getByRole("button", { name: /agregar frase/i });
    fireEvent.click(button);

    expect(screen.getByText("Dialog abierto")).toBeInTheDocument();
  });
});
