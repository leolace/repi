import { useRouteLoaderData } from "@remix-run/react";
import { CompleteSelfUser } from "common";

interface RootLoaderData {
  user: CompleteSelfUser | undefined;
  ENV: Record<string, string>;
}

export function useGetRootData() {
  const data = useRouteLoaderData<RootLoaderData>("root");

  if (!data) throw new Error("Data root not found.");

  return data;
}
