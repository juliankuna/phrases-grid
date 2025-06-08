import { render, screen } from "@testing-library/react";
import Loading from "@atoms/loading";

describe("Loading component", () => {
  it("renderiza sin mensaje y con color azul por defecto", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    expect(spinner.className).toContain("border-blue-500");
    expect(spinner.className).toContain("animate-spin");
    expect(screen.queryByText(/./)).toBeNull();
  });

  it("muestra el mensaje cuando se pasa por props", () => {
    const testMessage = "Cargando datos...";
    render(<Loading message={testMessage} />);
    const message = screen.getByText(testMessage);
    expect(message).toBeInTheDocument();
  });

  it("aplica el color personalizado en el borde del spinner", () => {
    render(<Loading color="red" />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toContain("border-red-500");
  });

  it("el spinner tiene la clase de animación animate-spin", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toContain("animate-spin");
  });
});
