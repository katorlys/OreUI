import "oreui-web/radio";

import type { OreRadio } from "oreui-web/radio";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type RadioProps = OreComponentProps<
  OreRadio,
  "checked" | "color" | "disabled" | "name" | "required" | "value"
>;

export const Radio = createOreComponent<OreRadio, RadioProps>({
  properties: ["checked", "color", "disabled", "name", "required", "value"],
  tagName: "ore-radio",
});