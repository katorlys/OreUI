import "oreui-web/checkbox";

import type { OreCheckbox } from "oreui-web/checkbox";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type CheckboxProps = OreComponentProps<
  OreCheckbox,
  "checked" | "color" | "disabled" | "name" | "required" | "value"
> & {
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = createOreComponent<OreCheckbox, CheckboxProps>({
  model: {
    callback: "onCheckedChange",
    event: "input",
    property: "checked",
  },
  properties: ["checked", "color", "disabled", "name", "required", "value"],
  tagName: "ore-checkbox",
});
