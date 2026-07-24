import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

export function getComponents(root) {
  const directory = resolve(root, "src/components");

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(resolve(directory, name, `${name}.ts`)))
    .sort();
}
