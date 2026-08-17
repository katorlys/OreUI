import { resolve } from "node:path";

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const root = import.meta.dirname;
const componentNames = [
  "accordion",
  "button",
  "card",
  "checkbox",
  "container",
  "divider",
  "dropdown",
  "icon-button",
  "modal",
  "navbar",
  "progress-bar",
  "progress-ring",
  "radio",
  "radio-group",
  "scrollbar",
  "slider",
  "spinner",
  "switch",
  "tab-bar",
  "tab-button",
  "table",
  "tag",
  "textfield",
  "toast",
  "toggles",
  "tooltip",
] as const;
const components = Object.fromEntries(
  componentNames.map((name) => [
    `components/${name}`,
    resolve(root, `src/components/${name}.tsx`),
  ]),
);

export default defineConfig({
  plugins: [solid()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(root, "src/index.ts"),
        ...components,
      },
      formats: ["es"],
    },
    rolldownOptions: {
      external: [/^oreui-web(?:\/|$)/, /^solid-js(?:\/|$)/],
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
