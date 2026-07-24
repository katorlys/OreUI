import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { getComponents } from "./components.js";

const root = resolve(import.meta.dirname, "..");
const styles = resolve(root, "src/styles");
const dist = resolve(root, "dist");

const imports = ["fonts.css", "tokens.css"];
const componentStyles = getComponents(root).map((name) =>
  resolve(root, `src/components/${name}/${name}.css`),
);
const css = await Promise.all(
  imports.map((file) => readFile(resolve(styles, file), "utf8")),
);
const componentCss = await Promise.all(
  [resolve(styles, "reset.css")]
    .concat(componentStyles)
    .map((file) => readFile(file, "utf8")),
);

await mkdir(resolve(dist, "assets/fonts"), { recursive: true });
await writeFile(
  resolve(dist, "styles.css"),
  `@layer theme, base, components, utilities;\n${css.join("\n")}\n@layer components {\n${componentCss.join("\n")}\n}\n`,
);
await cp(resolve(root, "src/assets/fonts"), resolve(dist, "assets/fonts"), {
  recursive: true,
});
await cp(resolve(root, "src/assets/icons"), resolve(dist, "icons"), {
  recursive: true,
});
