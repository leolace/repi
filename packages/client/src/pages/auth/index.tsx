import { Route, Routes } from "react-router";
import { Layout } from "./layout";
import Entrar from "./entrar/entrar.component";

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/criar" element={<div>teste</div>} />
      </Route>
    </Routes>
  );
}
