import "oreui-web/textfield";

import type { OreTextfield } from "oreui-web/textfield";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TextfieldProps = OreComponentProps<
  OreTextfield,
  | "autocomplete"
  | "description"
  | "disabled"
  | "error"
  | "inputMode"
  | "label"
  | "list"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
  | "name"
  | "pattern"
  | "placeholder"
  | "readonly"
  | "required"
  | "step"
  | "type"
  | "value"
> & {
  onValueChange?: (value: string) => void;
};

export const Textfield = createOreComponent<OreTextfield, TextfieldProps>({
  model: {
    callback: "onValueChange",
    event: "input",
    property: "value",
  },
  properties: [
    "autocomplete",
    "description",
    "disabled",
    "error",
    "inputMode",
    "label",
    "list",
    "max",
    "maxLength",
    "min",
    "minLength",
    "name",
    "pattern",
    "placeholder",
    "readonly",
    "required",
    "step",
    "type",
    "value",
  ],
  tagName: "ore-textfield",
});
