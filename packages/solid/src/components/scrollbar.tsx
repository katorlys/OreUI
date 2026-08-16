import "oreui-web/scrollbar";

import type { OreScrollbar } from "oreui-web/scrollbar";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type ScrollbarProps = OreComponentProps<OreScrollbar>;

export const Scrollbar = createOreComponent<OreScrollbar, ScrollbarProps>({
  tagName: "ore-scrollbar",
});