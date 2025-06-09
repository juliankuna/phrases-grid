import { Phrase } from "../types/Phrase";
import { axiosInstance } from "./servicesConfig";

/**
 * Servicio para gestionar las frases.
 * Proporciona métodos para obtener, actualizar, crear y eliminar frases empleando 
 * axios para realizar las peticiones HTTP al backend.
 */
export const PhrasesService = {
  async getPhrases(): Promise<Phrase[]> {
    try {
      const response = await axiosInstance.get<Phrase[]>("/phrases");
      return response.data;
    } catch (error) {
      console.error("Error fetching phrases:", error);
      throw error;
    }
  },

  async updatePhrase(phrase: Phrase): Promise<void> {
    try {
      await axiosInstance.put(`/phrases/${phrase.id}`, phrase);
    } catch (error) {
      console.error("Error updating phrases:", error);
      throw error;
    }
  },

  async createPhrase(phrase: Omit<Phrase, "id">): Promise<Phrase> {
    try {
      const response = await axiosInstance.post("/phrases", phrase);
      return response.data;
    } catch (error) {
      console.error("Error creating phrase:", error);
      throw error;
    }
  },

  async deletePhrase(phraseId: number): Promise<void> {
    try {
      await axiosInstance.delete(`/phrases/${phraseId}`);
    } catch (error) {
      console.error("Error deleting phrase:", error);
      throw error;
    }
  },
};
