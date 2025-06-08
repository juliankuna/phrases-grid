import { render } from "@testing-library/react";
import { HeartFilledIcon } from "@atoms/HeartFilledIcon";

describe("HeartFilledIcon", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(<HeartFilledIcon />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg?.getAttribute("fill")).toBe("currentColor");
  });

  it("acepta y aplica props como className, width y height", () => {
    const { container } = render(
      <HeartFilledIcon className="text-red-500" width="32" height="32" />
    );
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("class", "text-red-500");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("contiene el path correcto del corazón", () => {
    const { container } = render(<HeartFilledIcon />);
    const path = container.querySelector("path");

    expect(path).toHaveAttribute(
      "d",
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    );
  });
});
