import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@atoms/select";

describe("Select atoms", () => {
  it("Select renderiza y muestra item", async () => {
    render(
      <Select defaultValue="1">
        <SelectTrigger>Trigger</SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Item 1</SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByText("Trigger"));

    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });

  it("SelectGroup renderiza con data-slot", () => {
    render(<SelectGroup>Group content</SelectGroup>);
    expect(screen.getByText("Group content")).toBeInTheDocument();
  });

  it("SelectValue renderiza correctamente", async () => {
    render(
      <Select defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Elegime</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    await waitFor(() => {
      const value = screen
        .getAllByText("Elegime")
        .find((el) => el.getAttribute("data-slot") === "select-value");
      expect(value).toBeInTheDocument();
    });
  });

  it("SelectTrigger renderiza con children y data-size", () => {
    render(
      <Select>
        <SelectTrigger size="sm">Trigger content</SelectTrigger>
      </Select>
    );

    const trigger = screen.getByText("Trigger content");
    expect(trigger).toBeInTheDocument();
    expect(trigger.closest("[data-slot='select-trigger']")).toHaveAttribute(
      "data-size",
      "sm"
    );
  });

  it("SelectContent renderiza children", async () => {
    render(
      <Select defaultValue="1">
        <SelectTrigger>Trigger</SelectTrigger>
        <SelectContent>
          <div>Content child</div>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByText("Trigger"));

    await waitFor(() => {
      expect(screen.getByText("Content child")).toBeInTheDocument();
    });
  });

  it("SelectLabel renderiza con clase y data-slot", () => {
    render(
      <SelectGroup>
        <SelectLabel className="extra-class">Label content</SelectLabel>
      </SelectGroup>
    );

    const label = screen.getByText("Label content");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("data-slot", "select-label");
    expect(label).toHaveClass("extra-class");
  });

  it("SelectItem renderiza children, data-slot y clases", async () => {
    render(
      <Select defaultValue="item-1">
        <SelectTrigger>Trigger</SelectTrigger>
        <SelectContent>
          <SelectItem value="item-1" className="custom-class">
            Item content
          </SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByText("Trigger"));

    await waitFor(() => {
      const item = screen.getByText("Item content");
      expect(item).toBeInTheDocument();
      expect(item.closest("[data-slot='select-item']")).toHaveClass(
        "custom-class"
      );
    });
  });

  it("SelectSeparator renderiza y tiene data-slot y clases", () => {
    render(<SelectSeparator className="sep-class" />);

    const separator = document.querySelector("[data-slot='select-separator']");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("sep-class");
  });
});
