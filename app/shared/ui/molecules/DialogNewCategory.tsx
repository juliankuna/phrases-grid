import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
} from "@atoms/dialog";
import { Label } from "@atoms/label";
import { Input } from "@atoms/input";
import { Button } from "@atoms/button";
import { useCategoryStore } from "@store/categoryStore";
import { Category } from "app/shared/types/Category";
import { useCreateCategory } from "@hooks/usePersistCategory";

interface DialogNewCategoryProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const DialogNewCategory: React.FC<DialogNewCategoryProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const categories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategories);

  // Hook para crear una nueva categoría en el backend
  const createCategoryMutation = useCreateCategory();

  const addCategory = async () => {
    if (newCategoryName.trim()) {
      const newCategory: Omit<Category, "id"> = {
        name: newCategoryName.trim(),
      };

      const category = await createCategoryMutation.mutateAsync(newCategory as Category);

      setCategories([...categories, category]);

      setNewCategoryName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar nueva categoría</DialogTitle>
          <DialogDescription>
            Escribe el nombre de la nueva categoría para tus frases.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category-name">Categoría</Label>
            <Input
              id="category-name"
              placeholder="Ej: Motivación"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={addCategory}
            disabled={!newCategoryName.trim()}
          >
            Agregar categoría
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewCategory;
