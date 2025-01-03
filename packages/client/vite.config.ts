import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
      future: {
        v3_singleFetch: true,
      },
      appDirectory: "./src"
    }),
    tsconfigPaths(),
  ],
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
});
