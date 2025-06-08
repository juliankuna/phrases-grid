import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@atoms/input";

describe("Componente Input", () => {
  it("debería renderizarse correctamente con un valor por defecto", () => {
    render(<Input defaultValue="Texto de prueba" />);

    // Verificar que el input contenga el valor inicial
    expect(screen.getByDisplayValue("Texto de prueba")).toBeInTheDocument();
  });

  it("debería aceptar escritura del usuario", () => {
    render(<Input placeholder="Escribe aquí..." />);

    const input = screen.getByPlaceholderText("Escribe aquí...");

    // Simular ingreso de texto
    fireEvent.change(input, { target: { value: "Nuevo texto" } });

    expect(input).toHaveValue("Nuevo texto");
  });

  it("debería tener el atributo data-slot", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");

    // Verificar atributo data-slot
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("debería aplicar la clase adicional si se pasa className", () => {
    render(<Input className="mi-clase-personalizada" />);

    const input = screen.getByRole("textbox");

    // Verificar que tenga la clase personalizada
    expect(input).toHaveClass("mi-clase-personalizada");
  });

  it("debería estar deshabilitado si se pasa disabled", () => {
    render(<Input disabled />);

    const input = screen.getByRole("textbox");

    // Verificar que esté deshabilitado
    expect(input).toBeDisabled();
  });

  it("debería tener el tipo correcto si se pasa type", () => {
    render(<Input type="email" />);

    const input = screen.getByRole("textbox");

    // Verificar el atributo type
    expect(input).toHaveAttribute("type", "email");
  });
});
