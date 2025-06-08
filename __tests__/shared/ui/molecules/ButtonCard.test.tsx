import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonCard from "@molecules/ButtonCard";


describe("ButtonCard", () => {
  const icon = <svg data-testid="icon-svg" />;

  it("renderiza correctamente con las props mínimas", () => {
    render(<ButtonCard ariaLabel="botón prueba" icon={icon} />);
    const button = screen.getByRole("button", { name: /botón prueba/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("opacity-0");
    expect(button).toHaveClass("group-hover:opacity-100");
    expect(button).toHaveClass("transition-opacity");
    expect(screen.getByTestId("icon-svg")).toBeInTheDocument();
  });

  it("aplica la clase adicional pasada por props", () => {
    render(<ButtonCard ariaLabel="botón" icon={icon} className="mi-clase" />);
    const button = screen.getByRole("button", { name: /botón/i });
    expect(button).toHaveClass("mi-clase");
  });

  it("dispara la función onClick al hacer click", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <ButtonCard ariaLabel="botón clickeable" icon={icon} onClick={handleClick} />
    );
    const button = screen.getByRole("button", { name: /botón clickeable/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("tiene el atributo aria-label correctamente asignado", () => {
    render(<ButtonCard ariaLabel="etiqueta accesible" icon={icon} />);
    const button = screen.getByRole("button", { name: /etiqueta accesible/i });
    expect(button).toHaveAttribute("aria-label", "etiqueta accesible");
  });
});
