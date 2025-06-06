import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@atoms/button';
import DialogNewPhrase from '@molecules/DialogNewPhrase';

const TopPhraseSection: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tus frases</h1>
          <p className="text-muted-foreground">
            Gestiona las frases a tu gusto y destaca tus favoritas
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Frase
        </Button>

        <DialogNewPhrase
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
  );
};

export default TopPhraseSection;
