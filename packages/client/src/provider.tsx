import { SessionProvider } from "@contexts/session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Provider({ children }: PropsWithChildren) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
