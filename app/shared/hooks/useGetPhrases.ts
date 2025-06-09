import { useQuery } from "@tanstack/react-query";
import { PhrasesService } from "../services/PhrasesService";

/**
 * Custom hook para obtener las frases desde el backend 
 * empleando React Query para consumir el servicio de frases.
 */
export const useGetPhrases = () => {
    const getPhrasesQuery = useQuery({
        queryKey: ["phrases"],
        queryFn: PhrasesService.getPhrases,
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        getPhrasesQuery,
    };
}