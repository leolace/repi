import { Route, Routes } from "react-router";
import { RepublicaProfile } from "./pages/profile/profile.component";

export function RepublicaRoutes() {
  return (
    <Routes>
      <Route path="/:id" element={<RepublicaProfile />}/>
    </Routes>
  );
}
