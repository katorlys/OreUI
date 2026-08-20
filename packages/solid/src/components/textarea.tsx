import "oreui-web/textarea";

import type { OreTextarea } from "oreui-web/textarea";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TextareaProps = OreComponentProps<
  OreTextarea,
  | "autocomplete"
  | "description"
  | "disabled"
  | "error"
  | "inputMode"
  | "label"
  | "maxLength"
  | "minLength"
  | "name"
  | "placeholder"
  | "readonly"
  | "required"
  | "rows"
  | "spellCheck"
  | "value"
  | "wrap"
> & {
  onValueChange?: (value: string) => void;
};

export const Textarea = createOreComponent<OreTextarea, TextareaProps>({
  events: {
    onChange: "change",
    onInput: "input",
  },
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
    "maxLength",
    "minLength",
    "name",
    "placeholder",
    "readonly",
    "required",
    "rows",
    "spellCheck",
    "value",
    "wrap",
  ],
  tagName: "ore-textarea",
});
