import DialogNewCategory from "@molecules/DialogNewCategory";
import ResultsSummary from "@molecules/ResultsSummary";
import TopSection from "@organisms/TopSection";
import { useFilterCategories } from "@hooks/useFilterCategories";
import { useCategoryStore } from "@store/categoryStore";
import SearchCategories from "@organisms/SearchCategories";
import CategoriesGrid from "@organisms/CategoriesGrid";

import { useInitializeData } from "~/shared/hooks/useInitializeData";
import Loading from "@atoms/loading";

export default function CategoriesPage() {
  const { isLoading } = useInitializeData();

  const categories = useCategoryStore((state) => state.categories);
  const filteredCategories = useFilterCategories();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      <main className="flex-grow container mx-auto p-6 max-w-6xl">
        <TopSection
          title="Tus categorías"
          description="Agrupa tus frases en categorías de temas o estilos"
          dialogTriggerLabel="Agregar categoría"
          DialogComponent={DialogNewCategory}
        />
        <SearchCategories />
        <ResultsSummary
          filtered={filteredCategories.length}
          total={categories.length}
        />
        <CategoriesGrid filteredCategories={filteredCategories} />
      </main>
    </div>
  );
}
