import { PhrasesService } from "../services/PhrasesService"
import { Phrase } from "../types/Phrase"
import { useBatchMutation } from "./useBatchMutation"

export const useUpdatePhrase = () => {
  return useBatchMutation<Phrase>(PhrasesService.updatePhrase);
}

export const useCreatePhrase = () => {
  return useBatchMutation<Omit<Phrase, "id">, Phrase>(PhrasesService.createPhrase);
}

export const useDeletePhrase = () => {
  return useBatchMutation<number>(PhrasesService.deletePhrase);
}