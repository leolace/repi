import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
      future: {
        v3_singleFetch: true
      },
      appDirectory: "./src"
    }),
    tsconfigPaths()
  ],
  preview: {
    port: 3000
  },
  server: {
    port: 3000
  }
});
