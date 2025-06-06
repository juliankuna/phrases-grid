type Props = {
  total: number;
  filtered: number;
};

export default function ResultsSummary({ total, filtered }: Props) {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground">
        Mostrando {filtered} de {total} frases
      </p>
    </div>
  );
}
