import { useRouteLoaderData } from "react-router";
import { RouteData } from "./types";

export function useGetRepublicaRouteData() {
  const data = useRouteLoaderData<RouteData>("routes/republica/route");

  if (!data) throw new Error("Republica route data not found");

  return data;
}
