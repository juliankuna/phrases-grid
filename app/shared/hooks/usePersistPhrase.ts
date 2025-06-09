import { PhrasesService } from "../services/PhrasesService"
import { Phrase } from "../types/Phrase"
import { useBatchMutation } from "./useBatchMutation"

/**
 * Custom hooks para gestionar la persistencia de frases empleando el custom hook useBatchMutation
 * Estos hooks permiten crear, actualizar y eliminar frases mediante el servicio PhrasesService.
 * */

export const useUpdatePhrase = () => {
  return useBatchMutation<Phrase>(PhrasesService.updatePhrase);
}

export const useCreatePhrase = () => {
  return useBatchMutation<Omit<Phrase, "id">, Phrase>(PhrasesService.createPhrase);
}

export const useDeletePhrase = () => {
  return useBatchMutation<number>(PhrasesService.deletePhrase);
}