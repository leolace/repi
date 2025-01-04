import { useRouteLoaderData } from "@remix-run/react";
import { ISelfUser } from "common";

interface RootLoaderData {
  user: ISelfUser | undefined;
  ENV: Record<string, string>;
}

export function useGetRootData() {
  const data = useRouteLoaderData<RootLoaderData>("root");

  if (!data) throw new Error("Data root not found.");

  return data;
}
