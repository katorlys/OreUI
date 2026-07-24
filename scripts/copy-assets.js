import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { getComponents } from "./components.js";

const root = resolve(import.meta.dirname, "..");
const styles = resolve(root, "src/styles");
const dist = resolve(root, "dist");

const imports = ["fonts.css", "tokens.css", "reset.css"];
const componentStyles = getComponents(root).map((name) =>
  resolve(root, `src/components/${name}/${name}.css`),
);
const css = await Promise.all(
  imports
    .map((file) => resolve(styles, file))
    .concat(componentStyles)
    .map((file) => readFile(file, "utf8")),
);

await mkdir(resolve(dist, "assets/fonts"), { recursive: true });
await writeFile(resolve(dist, "styles.css"), css.join("\n"));
await cp(resolve(root, "src/assets/fonts"), resolve(dist, "assets/fonts"), {
  recursive: true,
});
await cp(resolve(root, "src/assets/icons"), resolve(dist, "icons"), {
  recursive: true,
});
