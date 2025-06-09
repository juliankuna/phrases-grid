import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../services/CategoriesService";

/**
 * Custom hook para obtener las categorías desde el backend 
 * empleando React Query para consumir el servicio de categorías.
 */
export const useGetCategories = () => {
  const getCategoriesQuery = useQuery({
    queryKey: ["Categories"],
    queryFn: CategoriesService.getCategories,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    getCategoriesQuery,
  };
};
