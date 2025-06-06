import type { Route } from "./+types/home";
import { HomePage } from "../pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frases" },
    { name: "description", content: "Gestor de frases" },
  ];
}

export default function Home() {
  return <HomePage />;
}
