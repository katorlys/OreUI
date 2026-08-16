import { resolve } from "node:path";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

import { getComponents } from "./scripts/components.js";

const root = import.meta.dirname;
const components = Object.fromEntries(
  getComponents(root).map((name) => [
    `components/${name}/${name}`,
    resolve(root, `src/components/${name}/${name}.ts`),
  ]),
);

export default defineConfig({
  root: "demo",
  plugins: [svelte()],
  build: {
    outDir: resolve(root, "dist"),
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(root, "src/index.ts"),
        ...components,
      },
      formats: ["es"],
    },
    rolldownOptions: {
      external: [/^lit(?:\/|$)/],
    },
  },
});
