import React from "react";
import { Search } from "lucide-react";
import { Input } from "@atoms/input";
import { useFiltersStore } from "@store/filterStore";
import Searcher from "./Searcher";

const SearchCategories: React.FC = () => {
  const { searchText, setSearchText } = useFiltersStore();

  return (
    <Searcher title="Buscar">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar en las categorías..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10"
        />
      </div>
    </Searcher>
  );
};

export default SearchCategories;

