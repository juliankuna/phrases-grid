import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/card";
import { Badge } from "@atoms/badge";
import { Heart, Trash2, Pen, Check, X } from "lucide-react";
import { HeartFilledIcon } from "@atoms/HeartFilledIcon";
import { Phrase } from "~/shared/types/Phrase";
import { usePhraseStore } from "@store/phraseStore";
import { getFormattedDate } from "~/shared/lib/getFormatedDate";
import EmptyCard from "@molecules/EmptyCard";
import { useCategoryStore } from "@store/categoryStore";
import ButtonCard from "@molecules/ButtonCard";
import { Textarea } from "@atoms/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@atoms/select";
import { useDeletePhrase, useUpdatePhrase } from "@hooks/usePersistPhrase";

interface PhrasesGridProps {
  phrases: Phrase[];
}

const PhrasesGrid: React.FC<PhrasesGridProps> = ({ phrases }) => {
  const updatePhrase = usePhraseStore((state) => state.updatePhrase);
  const removePhrase = usePhraseStore((state) => state.removePhrase);

  // Mutaciones para actualizar y eliminar frases en el backend usando React Query
  const updatePhraseMutation = useUpdatePhrase();
  const deletePhraseMutation = useDeletePhrase();

  const categories = useCategoryStore((state) => state.categories);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategoryId, setEditedCategoryId] = useState<string>("");

  const getCategoryName = (categoryId: number): string => {
    return (
      categories.find((cat) => Number(cat.id) === categoryId)?.name ||
      "Sin categoría"
    );
  };

  const deletePhrase = async (id: number) => {
    removePhrase(id);
    await deletePhraseMutation.mutateAsync(id);
  };

  const toggleFavorite = async (phrase: Phrase) => {
    updatePhrase({ ...phrase, isFavorite: !phrase.isFavorite });
    await updatePhraseMutation.mutateAsync({
      ...phrase,
      isFavorite: !phrase.isFavorite,
    });
  };

  const handleEdit = (phrase: Phrase) => {
    setEditingId(phrase.id);
    setEditedDescription(phrase.description);
    setEditedCategoryId(phrase.categoryId.toString());
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedDescription("");
    setEditedCategoryId("");
  };

  const handleSave = async (phrase: Phrase) => {
    updatePhrase({
      ...phrase,
      description: editedDescription,
      categoryId: Number.parseInt(editedCategoryId),
    });

    await updatePhraseMutation.mutateAsync({
      ...phrase,
      description: editedDescription,
      categoryId: Number.parseInt(editedCategoryId),
    });

    handleCancelEdit();
  };

  if (phrases.length === 0) {
    return (
      <EmptyCard message="No se encontraron frases que coincidan con tu búsqueda." />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phrases.map((phrase) => (
        <Card
          key={phrase.id}
          className="relative group hover:shadow-lg transition-shadow"
          highlighted={phrase.isFavorite}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              {editingId === phrase.id ? (
                <Select
                  value={editedCategoryId}
                  onValueChange={setEditedCategoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary" className="mb-2">
                  {getCategoryName(phrase.categoryId)}
                </Badge>
              )}

              <div className="flex gap-2">
                {editingId === phrase.id ? (
                  <>
                    <ButtonCard
                      className="text-green-500"
                      ariaLabel="Guardar frase"
                      icon={<Check className="w-4 h-4" />}
                      onClick={() => handleSave(phrase)}
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
                    ariaLabel="Editar frase"
                    icon={<Pen className="w-4 h-4" />}
                    onClick={() => handleEdit(phrase)}
                  />
                )}

                <ButtonCard
                  className="text-destructive"
                  ariaLabel="Eliminar frase"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => deletePhrase(phrase.id)}
                />
              </div>
            </div>
            {editingId === phrase.id ? (
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            ) : (
              <CardTitle className="text-base">{phrase.description}</CardTitle>
            )}
          </CardHeader>
          <CardContent className="flex justify-between items-center pt-0">
            <p className="text-sm text-muted-foreground">
              {getFormattedDate(phrase.date)}
            </p>
            <ButtonCard
              ariaLabel={
                phrase.isFavorite
                  ? "Quitar de favoritas"
                  : "Marcar como favorita"
              }
              icon={
                phrase.isFavorite ? (
                  <HeartFilledIcon className="w-4 h-4 text-red-500" />
                ) : (
                  <Heart className="w-4 h-4 text-muted-foreground" />
                )
              }
              onClick={() => toggleFavorite(phrase)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PhrasesGrid;
