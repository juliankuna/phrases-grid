import { useMutation } from "@tanstack/react-query";

/**
 * Hook genérico para mutaciones mediante React - Query para procesar requests.
 * @template T - Tipo del dato recibido .
 * @param actionFn - Función que se ejecuta al disparar la mutación.
 */
export const useBatchMutation = <T>(actionFn: (item: T) => Promise<void>) => {
  return useMutation<void, Error, T >({
    mutationFn: async (input: T ) => {
      const items = Array.isArray(input) ? input : [input];
      for (const item of items) {
        await actionFn(item);
      }
    },
  });
};
