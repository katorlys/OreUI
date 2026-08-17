import "oreui-web/radio-group";

import type { OreRadioGroup } from "oreui-web/radio-group";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type RadioGroupProps = OreComponentProps<OreRadioGroup>;

export const RadioGroup = createOreComponent<OreRadioGroup, RadioGroupProps>({
  tagName: "ore-radio-group",
});
