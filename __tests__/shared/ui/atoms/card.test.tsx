import { render } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@atoms/card";

describe("Card", () => {
  it("renderiza correctamente con estilos por defecto", () => {
    const { getByTestId } = render(<Card data-testid="card">Contenido</Card>);
    const card = getByTestId("card");

    expect(card).toHaveAttribute("data-slot", "card");
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("border-border");
  });

  it("aplica estilos destacados cuando highlighted es true", () => {
    const { getByTestId } = render(
      <Card data-testid="card" highlighted>
        Contenido
      </Card>
    );
    const card = getByTestId("card");

    expect(card.className).toContain("shadow-highlighted");
    expect(card.className).toContain("border-[#357edd]");
  });

  it("acepta clases personalizadas", () => {
    const { getByTestId } = render(
      <Card data-testid="card" className="mi-clase">
        Contenido
      </Card>
    );
    const card = getByTestId("card");

    expect(card.className).toContain("mi-clase");
  });
});

describe("Card subcomponents", () => {
  it("renderiza CardHeader correctamente", () => {
    const { getByTestId } = render(
      <CardHeader data-testid="card-header">Header</CardHeader>
    );
    const header = getByTestId("card-header");
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("renderiza CardTitle correctamente", () => {
    const { getByTestId } = render(
      <CardTitle data-testid="card-title">Título</CardTitle>
    );
    const title = getByTestId("card-title");
    expect(title).toHaveAttribute("data-slot", "card-title");
    expect(title.className).toContain("font-semibold");
  });

  it("renderiza CardDescription correctamente", () => {
    const { getByTestId } = render(
      <CardDescription data-testid="card-description">
        Descripción
      </CardDescription>
    );
    const description = getByTestId("card-description");
    expect(description).toHaveAttribute("data-slot", "card-description");
    expect(description.className).toContain("text-sm");
  });

  it("renderiza CardAction correctamente", () => {
    const { getByTestId } = render(
      <CardAction data-testid="card-action">Acción</CardAction>
    );
    const action = getByTestId("card-action");
    expect(action).toHaveAttribute("data-slot", "card-action");
    expect(action.className).toContain("justify-self-end");
  });

  it("renderiza CardContent correctamente", () => {
    const { getByTestId } = render(
      <CardContent data-testid="card-content">Contenido</CardContent>
    );
    const content = getByTestId("card-content");
    expect(content).toHaveAttribute("data-slot", "card-content");
    expect(content.className).toContain("px-6");
  });

  it("renderiza CardFooter correctamente", () => {
    const { getByTestId } = render(
      <CardFooter data-testid="card-footer">Footer</CardFooter>
    );
    const footer = getByTestId("card-footer");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
    expect(footer.className).toContain("flex");
  });
});

describe("Card layout", () => {
  it("permite componer todos los subcomponentes correctamente", () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <CardTitle>Header</CardTitle>
          <CardAction>Botón</CardAction>
        </CardHeader>
        <CardDescription>Descripción general</CardDescription>
        <CardContent>Cuerpo</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(getByText("Header")).toBeInTheDocument();
    expect(getByText("Botón")).toBeInTheDocument();
    expect(getByText("Descripción general")).toBeInTheDocument();
    expect(getByText("Cuerpo")).toBeInTheDocument();
    expect(getByText("Footer")).toBeInTheDocument();
  });
});
