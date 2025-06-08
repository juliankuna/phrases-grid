import { render, fireEvent } from "@testing-library/react";
import { Button } from "@atoms/button";

describe("Button", () => {
  it("se renderiza como un <button> por defecto", () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText("Click me");

    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("dispara el evento onClick correctamente", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(getByText("Click"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("aplica la clase de variante por defecto", () => {
    const { getByText } = render(<Button>Default</Button>);
    const button = getByText("Default");

    expect(button.className).toContain("bg-primary");
  });

  it("aplica la variante 'outline' correctamente", () => {
    const { getByText } = render(<Button variant="outline">Outline</Button>);
    const button = getByText("Outline");

    expect(button.className).toContain("border");
    expect(button.className).toContain("bg-background");
  });

  it("aplica el tamaño 'lg' correctamente", () => {
    const { getByText } = render(<Button size="lg">Grande</Button>);
    const button = getByText("Grande");

    expect(button.className).toContain("h-10");
    expect(button.className).toContain("px-6");
  });

  it("permite agregar clases personalizadas", () => {
    const { getByText } = render(
      <Button className="custom-class">Con clase</Button>
    );
    const button = getByText("Con clase");

    expect(button.className).toContain("custom-class");
  });

  it("se renderiza como child usando Slot", () => {
    const { getByText } = render(
      <Button asChild>
        <a href="#">Soy un link</a>
      </Button>
    );
    const button = getByText("Soy un link");

    expect(button.tagName.toLowerCase()).toBe("a");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("está deshabilitado cuando se le pasa disabled", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    const button = getByText("Disabled");

    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
