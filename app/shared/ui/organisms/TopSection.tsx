import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@atoms/button';

interface TopSectionProps {
  title: string;
  description: string;
  dialogTriggerLabel: string;
  DialogComponent: React.FC<{
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
  }>;
}

const TopSection: React.FC<TopSectionProps> = ({
  title,
  description,
  dialogTriggerLabel,
  DialogComponent,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        {dialogTriggerLabel}
      </Button>
      <DialogComponent
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default TopSection;
