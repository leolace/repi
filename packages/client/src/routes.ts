import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("inicio", "./routes/inicio/route.tsx"),

  route("auth", "./routes/auth/route.tsx", [
    route("criar", "./routes/auth/criar/route.tsx"),
    route("entrar", "./routes/auth/entrar/route.tsx"),
  ]),

  route("republica", "./routes/republica/route.tsx", [
    route(":id", "./routes/republica/profile/route.tsx"),
    route(":id/editar", "./routes/republica/editar/route.tsx"),
  ]),

  route("sair", "./routes/sair/route.tsx"),
] satisfies RouteConfig;
