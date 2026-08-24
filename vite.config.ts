import { resolve } from "node:path";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

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
  resolve: {
    alias: [
      {
        find: /^oreui-web\/(.+)$/,
        replacement: `${root}/src/components/$1/$1.ts`,
      },
      {
        find: "oreui-web",
        replacement: `${root}/src/index.ts`,
      },
    ],
  },
  plugins: [
    svelte(),
    solid({
      include: ["demo/solid.tsx", "packages/solid/src/**/*.tsx"],
    }),
  ],
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
