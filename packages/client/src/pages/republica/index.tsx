import { Route, Routes } from "react-router";
import { RepublicaProfile } from "./pages/profile/profile.component";
import { RepublicaEdit } from "./pages/edit/edit.component";

export function RepublicaRoutes() {
  return (
    <Routes>
      <Route path="/:id" element={<RepublicaProfile />}/>
      <Route path="/:id/editar" element={<RepublicaEdit />}/>
    </Routes>
  );
}
