import "oreui-web/divider";

import type { OreDivider } from "oreui-web/divider";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type DividerProps = OreComponentProps<OreDivider>;

export const Divider = createOreComponent<OreDivider, DividerProps>({
  tagName: "ore-divider",
});