import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopSection from "@organisms/TopSection";

const MockDialog: React.FC<{
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}> = ({ isDialogOpen }) => (isDialogOpen ? <div>Dialog abierto</div> : null);

describe("TopSection", () => {
  const title = "Título de prueba";
  const description = "Descripción de prueba";
  const dialogTriggerLabel = "Abrir Dialog";

  it("renderiza título, descripción y botón", () => {
    render(
      <TopSection
        title={title}
        description={description}
        dialogTriggerLabel={dialogTriggerLabel}
        DialogComponent={MockDialog}
      />
    );

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: dialogTriggerLabel })).toBeInTheDocument();
  });

  it("abre el Dialog al hacer clic en el botón", () => {
    render(
      <TopSection
        title={title}
        description={description}
        dialogTriggerLabel={dialogTriggerLabel}
        DialogComponent={MockDialog}
      />
    );

    const button = screen.getByRole("button", { name: dialogTriggerLabel });
    fireEvent.click(button);

    expect(screen.getByText("Dialog abierto")).toBeInTheDocument();
  });
});
