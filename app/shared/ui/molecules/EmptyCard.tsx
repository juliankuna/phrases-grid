import React from 'react';
import { Card, CardContent } from '@atoms/card';

interface EmptyCardProps {
  message: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({ message }) => {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
};

export default EmptyCard;
