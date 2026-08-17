import "oreui-web/toggles";

import type { OreToggles } from "oreui-web/toggles";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TogglesProps = OreComponentProps<OreToggles>;

export const Toggles = createOreComponent<OreToggles, TogglesProps>({
  tagName: "ore-toggles",
});
