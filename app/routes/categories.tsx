import type { Route } from "./+types/categories";
import CategoriesPage from "../pages/Categories";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categorías" },
    { name: "description", content: "Gestor de categorías" },
  ];
}

export default function CategoriasRoute() {
  return <CategoriesPage />;
}
