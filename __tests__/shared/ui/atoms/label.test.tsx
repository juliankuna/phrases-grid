import { render, screen } from "@testing-library/react";
import { Label } from "@atoms/label";

describe("Label component", () => {
  it("renderiza sin errores", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("aplica la clase personalizada pasada por props", () => {
    render(<Label className="custom-class">Label con clase</Label>);
    const label = screen.getByText("Label con clase");
    expect(label).toHaveClass("custom-class");
  });

  it("pasa correctamente las props adicionales", () => {
    render(<Label htmlFor="input-id">Label con htmlFor</Label>);
    const label = screen.getByText("Label con htmlFor");
    expect(label).toHaveAttribute("for", "input-id");
  });

  it("tiene el atributo data-slot con valor 'label'", () => {
    render(<Label>Label con data-slot</Label>);
    const label = screen.getByText("Label con data-slot");
    expect(label).toHaveAttribute("data-slot", "label");
  });

it("tiene el atributo data-disabled cuando está deshabilitado", () => {
  render(<Label data-disabled="true">Label disabled</Label>);
  const label = screen.getByText("Label disabled");
  expect(label).toHaveAttribute("data-disabled", "true");
});


});
