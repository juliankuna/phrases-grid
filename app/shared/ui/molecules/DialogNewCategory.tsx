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

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const category: Category = {
        id: Date.now(),
        name: newCategoryName.trim(),
      };
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
