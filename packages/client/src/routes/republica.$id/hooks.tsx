import { useRouteLoaderData } from "@remix-run/react";
import { RouteData } from "./types";

export function useGetRepublicaRouteData() {
  const data = useRouteLoaderData<RouteData>("routes/republica.$id");

  if (!data) throw new Error("Republica route data not found");

  return data;
}
