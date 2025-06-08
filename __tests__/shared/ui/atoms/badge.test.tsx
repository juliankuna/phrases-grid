import { render } from "@testing-library/react";
import { Badge } from "@atoms/badge";

describe("Badge", () => {
  it("se renderiza como un <span> por defecto", () => {
    const { getByText } = render(<Badge>Texto badge</Badge>);
    const badge = getByText("Texto badge");

    expect(badge.tagName.toLowerCase()).toBe("span");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("aplica la clase por defecto correctamente", () => {
    const { getByText } = render(<Badge>Default</Badge>);
    const badge = getByText("Default");

    expect(badge.className).toContain("bg-primary");
  });

  it("aplica la variante 'secondary' correctamente", () => {
    const { getByText } = render(<Badge variant="secondary">Secundario</Badge>);
    const badge = getByText("Secundario");

    expect(badge.className).toContain("bg-secondary");
  });

  it("aplica la variante 'destructive' correctamente", () => {
    const { getByText } = render(<Badge variant="destructive">Peligro</Badge>);
    const badge = getByText("Peligro");

    expect(badge.className).toContain("bg-destructive");
  });

  it("permite añadir clases personalizadas", () => {
    const { getByText } = render(
      <Badge className="custom-class">Con clase</Badge>
    );
    const badge = getByText("Con clase");

    expect(badge.className).toContain("custom-class");
  });

  it("se puede renderizar como child usando Slot", () => {
    const { getByText } = render(
      <Badge asChild>
        <a href="#">Soy un link</a>
      </Badge>
    );
    const badge = getByText("Soy un link");

    expect(badge.tagName.toLowerCase()).toBe("a");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });
});
