import { Route, Routes } from "react-router";
import { Layout } from "./layout";
import Login from "./pages/entrar/entrar.component";
import { CreateAccount } from "./pages/criar/criar.component";
import { Sair } from "./pages/sair/sair.component";

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/entrar" element={<Login />} />
        <Route path="/criar" element={<CreateAccount />} />
        <Route path="/sair" element={<Sair />} />
      </Route>
    </Routes>
  );
}
