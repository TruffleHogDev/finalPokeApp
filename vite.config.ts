import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      basename: "/",
      buildDirectory: "build",
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      serverBuildFile: "index.js",
    }),
    tsconfigPaths(),
  ],
  build: {
    outDir: "build",
    rollupOptions: {
      input: "app/root.tsx",
    },
  },
});
