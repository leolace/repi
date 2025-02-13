import { AppRoutes } from "./routes/index.tsx";
import { Provider } from "@provider.tsx";
import "./index.css";

export function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}
