import { useQuery } from "@tanstack/react-query";
import { PhrasesService } from "../services/PhrasesService";

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