import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/card";
import { Badge } from "@atoms/badge";
import { Button } from "@atoms/button";
import { Heart, Trash2 } from "lucide-react";
import { HeartFilledIcon } from "@atoms/HeartFilledIcon";
import { Phrase } from "~/shared/types/Phrase";
import { usePhraseStore } from "@store/phraseStore";
import { getFormattedDate } from "~/shared/lib/getFormatedDate";
import EmptyCard from "../molecules/EmptyCard";
import { useCategoryStore } from "~/shared/store/categoryStore";

interface PhrasesGridProps {
  phrases: Phrase[];
}

const PhrasesGrid: React.FC<PhrasesGridProps> = ({
  phrases,
}) => {
  const setPhrases = usePhraseStore((state) => state.setPhrases);
  const updatePhrase = usePhraseStore((state) => state.updatePhrase);
  const categories = useCategoryStore((state) => state.categories);

  const getCategoryName = (categoryId: number): string => {
    return (
      categories.find((cat) => Number(cat.id) === categoryId)?.name ||
      "Sin categoría"
    );
  };

  const deletePhrase = (id: number) => {
    setPhrases(phrases.filter((phrase) => phrase.id !== id));
  };

  const toggleFavorite = (phrase: Phrase) => {
    updatePhrase({ ...phrase, isFavorite: !phrase.isFavorite });
  };

  if (phrases.length === 0) {
    return (<EmptyCard message="No se encontraron frases que coincidan con tu búsqueda." />);
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
              <Badge variant="secondary" className="mb-2">
                {getCategoryName(phrase.categoryId)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deletePhrase(phrase.id)}
                aria-label="Eliminar frase"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardTitle className="text-base">{phrase.description}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center pt-0">
            <p className="text-sm text-muted-foreground">
              {getFormattedDate(phrase.date)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(phrase)}
              aria-label={
                phrase.isFavorite
                  ? "Quitar de favoritas"
                  : "Marcar como favorita"
              }
            >
              {phrase.isFavorite ? (
                <HeartFilledIcon className="w-4 h-4 text-red-500" />
              ) : (
                <Heart className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PhrasesGrid;
