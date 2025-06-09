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
import { Textarea } from "@atoms/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@atoms/select";
import { Button } from "@atoms/button";
import { Phrase } from "~/shared/types/Phrase";
import { usePhraseStore } from "@store/phraseStore";
import { useCategoryStore } from "@store/categoryStore";
import { useCreatePhrase } from "~/shared/hooks/usePersistPhrase";
import Loading from "../atoms/loading";

interface DialogNewPhraseProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const DialogNewPhrase: React.FC<DialogNewPhraseProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [newPhrase, setNewPhrase] = useState("");
  const [newCategoryId, setNewCategoryId] = useState<string>("");
  const phrases = usePhraseStore((state) => state.phrases);
  const setPhrases = usePhraseStore((state) => state.setPhrases);
  const categories = useCategoryStore((state) => state.categories);

  // Hook para crear una nueva frase en el backend
  const createPhraseMutation = useCreatePhrase();

  // Agrega una nueva frase en la store y en el backend
  const addPhrase = async () => {
    if (newPhrase.trim() && newCategoryId) {
      const phraseWithoutId: Omit<Phrase, "id"> = {
        description: newPhrase.trim(),
        date: new Date(),
        categoryId: Number.parseInt(newCategoryId),
        isFavorite: false,
      };

      const phrase = await createPhraseMutation.mutateAsync(
        phraseWithoutId as Phrase
      );
      setPhrases([...phrases, phrase]);

      setNewPhrase("");
      setNewCategoryId("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar nueva frase</DialogTitle>
          <DialogDescription>
            Escribe una nueva frase y selecciona su categoría.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="phrase">Frase</Label>
            <Textarea
              id="phrase"
              placeholder="Escribe tu frase aquí..."
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={newCategoryId} onValueChange={setNewCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            data-testid="submit-phrase"
            type="submit"
            onClick={addPhrase}
            disabled={!newPhrase.trim() || !newCategoryId}
          >
            {createPhraseMutation.isPending ? (
              <Loading color="white" />
            ) : (
              <>Agregar frase</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewPhrase;
