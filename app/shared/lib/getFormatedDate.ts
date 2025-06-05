export const getFormattedDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // El valor de los meses varía de 0 a 11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
