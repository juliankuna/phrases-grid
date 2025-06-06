import React from "react";
import { Search } from "lucide-react";
import { Input } from "@atoms/input";
import { Label } from "@atoms/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@atoms/select";
import { useCategoryStore } from "@store/categoryStore";
import { useFiltersStore } from "@store/filterStore";
import Searcher from "./Searcher";

const SearchAndFilterPhrases: React.FC = () => {
  const categories = useCategoryStore((state) => state.categories);
  const {
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
  } = useFiltersStore();

  return (
    <Searcher title="Buscar y Filtrar">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar en las frases..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filtro por categoría */}
        <div className="flex-1">
          <Label htmlFor="category-filter" className="text-sm font-medium">
            Categoría
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por orden */}
        <div className="flex-1">
          <Label htmlFor="sort-order" className="text-sm font-medium">
            Ordenar por
          </Label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger id="sort-order">
              <SelectValue placeholder="Selecciona un orden" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="oldest">Más antiguas</SelectItem>
              <SelectItem value="favorites">Favoritas primero</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Searcher>
  );
};

export default SearchAndFilterPhrases;
