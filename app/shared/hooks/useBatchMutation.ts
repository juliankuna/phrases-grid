import { useMutation } from "@tanstack/react-query";

/**
 * Hook genérico para mutaciones mediante React - Query para procesar requests.
 * @template T - Tipo del dato recibido .
 * @param actionFn - Función que se ejecuta al disparar la mutación.
 */
export const useBatchMutation= <TInput, TResponse = void>(
  actionFn: (input: TInput) => Promise<TResponse>
) => {
  return useMutation<TResponse, Error, TInput>({
    mutationFn: actionFn,
  });
};