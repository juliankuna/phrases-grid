import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),  // "/"
    route("categorias", "routes/categories.tsx"), // ruta "/categorias"
] satisfies RouteConfig;



//EXAMPLE
// export default [
//   index("routes/home.tsx"),           // "/"
//   route("routes/about.tsx"),          // "/about"
//   route("routes/login.tsx"),          // "/login"
//   route("routes/settings/index.tsx", {
//     children: [
//       route("routes/settings/profile.tsx"),
//       route("routes/settings/notifications.tsx"),
//     ],
//   }),
// ] satisfies RouteConfig;