import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@atoms/card";
import { Input } from "@atoms/input";
import { Pen, Trash2, Check, X } from "lucide-react";
import EmptyCard from "@molecules/EmptyCard";
import { useCategoryStore } from "@store/categoryStore";
import { Category } from "app/shared/types/Category";
import ButtonCard from "@molecules/ButtonCard";
import {
  useDeleteCategory,
  useUpdateCategory,
} from "@hooks/usePersistCategory";

interface CategoriesGridProps {
  filteredCategories: Category[];
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  filteredCategories,
}) => {
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const removeCategory = useCategoryStore((state) => state.removeCategory);
  const categories = useCategoryStore((state) => state.categories);

  // Mutaciones para actualizar y eliminar frases en el backend usando React Query
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");

  const deleteCategory = async (id: number) => {
    removeCategory(id);
    await deleteCategoryMutation.mutateAsync(id);
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditedName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedName("");
  };

  const handleSave = async (category: Category) => {
    updateCategory({ ...category, name: editedName });
    await updateCategoryMutation.mutateAsync({ ...category, name: editedName });
    handleCancelEdit();
  };

  if (filteredCategories.length === 0) {
    return (
      <EmptyCard message="No se encontraron categorías que coincidan con tu búsqueda." />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCategories.map((category) => (
        <Card
          key={category.id}
          className="relative group hover:shadow-lg transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              {editingId === category.id ? (
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="flex-1 text-base"
                />
              ) : (
                <CardTitle className="text-base">{category.name}</CardTitle>
              )}

              <div className="flex gap-2">
                {editingId === category.id ? (
                  <>
                    <ButtonCard
                      className="text-green-500"
                      ariaLabel="Guardar categoría"
                      icon={<Check className="w-4 h-4" />}
                      onClick={() => handleSave(category)}
                    />
                    <ButtonCard
                      className="text-destructive"
                      ariaLabel="Cancelar edición"
                      icon={<X className="w-4 h-4" />}
                      onClick={handleCancelEdit}
                    />
                  </>
                ) : (
                  <ButtonCard
                    className="text-blue-700"
                    ariaLabel="Editar categoría"
                    icon={<Pen className="w-4 h-4" />}
                    onClick={() => handleEdit(category)}
                  />
                )}

                <ButtonCard
                  className="text-destructive"
                  ariaLabel="Eliminar categoría"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => deleteCategory(category.id)}
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesGrid;
