import { Layout } from "@layout";
import { AuthRoutes } from "@pages/auth";
import { ConfiguracoesRoutes } from "@pages/configuracoes";
import { Inicio } from "@pages/inicio";
import { RepublicaRoutes } from "@pages/republica";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/inicio" replace />} />

          <Route path="/inicio" element={<Inicio />} />
          <Route path="/configuracoes/*" element={<ConfiguracoesRoutes />} />
          <Route path="/auth/*" element={<AuthRoutes />}/>
          <Route path="/republica/*" element={<RepublicaRoutes />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
