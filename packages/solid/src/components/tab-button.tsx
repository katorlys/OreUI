import "oreui-web/tab-button";

import type { OreTabButton } from "oreui-web/tab-button";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TabButtonProps = OreComponentProps<
  OreTabButton,
  "color" | "disabled" | "palette" | "selected" | "type" | "variant"
>;

export const TabButton = createOreComponent<OreTabButton, TabButtonProps>({
  properties: ["color", "disabled", "palette", "selected", "type", "variant"],
  tagName: "ore-tab-button",
});
