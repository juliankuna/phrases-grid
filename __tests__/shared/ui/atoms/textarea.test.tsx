import { render, screen } from "@testing-library/react";

import { Textarea } from "@atoms/textarea"; // ajustá la ruta según tu estructura

describe("Textarea", () => {
  it("renderiza sin errores", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("tiene las clases por defecto", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-input");
    expect(textarea).toHaveClass("rounded-md");
    expect(textarea).toHaveClass("w-full");
  });

  it("aplica la clase adicional pasada por props", () => {
    render(<Textarea className="mi-clase" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("mi-clase");
  });

  it("acepta y pasa el placeholder", () => {
    render(<Textarea placeholder="Escribí algo..." />);
    const textarea = screen.getByPlaceholderText("Escribí algo...");
    expect(textarea).toBeInTheDocument();
  });

  it("acepta el atributo disabled", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("acepta aria-invalid y aplica las clases correspondientes", () => {
    render(<Textarea aria-invalid="true" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass("aria-invalid:ring-destructive/20");
    expect(textarea).toHaveClass("aria-invalid:border-destructive");
  });
});
