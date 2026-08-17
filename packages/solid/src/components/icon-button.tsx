import "oreui-web/icon-button";

import type { OreIconButton } from "oreui-web/icon-button";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type IconButtonProps = OreComponentProps<
  OreIconButton,
  "color" | "disabled" | "type" | "variant"
>;

export const IconButton = createOreComponent<OreIconButton, IconButtonProps>({
  properties: ["color", "disabled", "type", "variant"],
  tagName: "ore-icon-button",
});
