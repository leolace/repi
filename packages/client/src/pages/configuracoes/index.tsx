import { Route, Routes } from "react-router";
import { Configuracoes } from "./route";

export function ConfiguracoesRoutes() {
  return (
    <Routes>
      <Route index element={<Configuracoes />} />
    </Routes>
  );
}
