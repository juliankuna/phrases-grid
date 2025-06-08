import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@atoms/dialog";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Componente Dialog", () => {
  it("debería renderizarse y abrir el Dialog al activarse", async () => {
    render(
      <Dialog>
        <DialogTrigger>Abrir Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Título</DialogTitle>
            <DialogDescription>Descripción</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Aceptar</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // Al inicio, el contenido no debería estar en el documento
    expect(screen.queryByText("Título de mi Dialog")).not.toBeInTheDocument();

    // Hacer click en el botón de apertura
    fireEvent.click(screen.getByText("Abrir Dialog"));

    // Esperar a que el contenido aparezca
    expect(await screen.findByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
  });

  it("debería cerrar el Dialog al hacer click en el botón de cierre", async () => {
    render(
      <Dialog>
        <DialogTrigger>Abrir Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog a cerrar</DialogTitle>
          <DialogDescription>descripción</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Abrir Dialog"));

    expect(await screen.findByText("Dialog a cerrar")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeButton);

    // El cierre es asíncrono (por animación), así que esperamos a que desaparezca
    await waitFor(() =>
      expect(screen.queryByText("Dialog a cerrar")).not.toBeInTheDocument()
    );
  });

  it("no debería renderizar el botón de cierre si showCloseButton es false", async () => {
    render(
      <Dialog>
        <DialogTrigger>Abrir Dialog</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Título sin cierre</DialogTitle>
          <DialogDescription>descripción</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Abrir Dialog"));

    expect(await screen.findByText("Título sin cierre")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /cerrar/i })
    ).not.toBeInTheDocument();
  });

  it("debería tener los atributos data-slot correctos", async () => {
    render(
      <Dialog>
        <DialogTrigger>Activador</DialogTrigger>
        <DialogContent>
          <DialogTitle>Título</DialogTitle>
          <DialogDescription>Descripción</DialogDescription>
          <DialogHeader />
          <DialogFooter />
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Activador"));

    expect(await screen.findByText("Título")).toBeInTheDocument();

    expect(
      screen.getByText("Título").closest("[data-slot='dialog-title']")
    ).toBeInTheDocument();
    expect(
      screen
        .getByText("Descripción")
        .closest("[data-slot='dialog-description']")
    ).toBeInTheDocument();

    const title = await screen.findByText("Título");
    expect(title.closest("[data-slot='dialog-content']")).toBeInTheDocument();
  });

  it("debería cerrar el Dialog al usar el componente DialogClose", async () => {
    render(
      <Dialog>
        <DialogTrigger>Abrir Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog con cierre</DialogTitle>
          <DialogDescription>
            Confirmación para cerrar el Dialog
          </DialogDescription>
          <DialogClose>Cierre personalizado</DialogClose>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Abrir Dialog"));
    expect(await screen.findByText("Dialog con cierre")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cierre personalizado"));
    expect(
      await screen.queryByText("Dialog con cierre")
    ).not.toBeInTheDocument();
  });
});
