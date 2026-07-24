import { resolve } from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  root: "demo",
  build: {
    outDir: resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(import.meta.dirname, "src/index.ts"),
        button: resolve(import.meta.dirname, "src/components/button/index.ts"),
      },
      formats: ["es"],
    },
    rolldownOptions: {
      external: [/^lit(?:\/|$)/],
    },
  },
});
