import "oreui-web/switch";

import type { OreSwitch } from "oreui-web/switch";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type SwitchProps = OreComponentProps<
  OreSwitch,
  "checked" | "color" | "disabled" | "name" | "required" | "value" | "variant"
> & {
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = createOreComponent<OreSwitch, SwitchProps>({
  model: {
    callback: "onCheckedChange",
    event: "input",
    property: "checked",
  },
  properties: [
    "checked",
    "color",
    "disabled",
    "name",
    "required",
    "value",
    "variant",
  ],
  tagName: "ore-switch",
});
