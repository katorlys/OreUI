import "oreui-web/dropdown";

import type { OreDropdown, OreDropdownChangeDetail } from "oreui-web/dropdown";
import { createOreComponent } from "../factory.js";
import type { OpenChangeProps, OreComponentProps } from "../types.js";

type DropdownBaseProps = OreComponentProps<
  OreDropdown,
  "defaultOpen" | "open" | "value" | "variant"
>;

export type DropdownProps = Omit<DropdownBaseProps, "onChange"> &
  OpenChangeProps & {
    onChange?: (event: CustomEvent<OreDropdownChangeDetail>) => void;
    onValueChange?: (value: string) => void;
  };

export const Dropdown = createOreComponent<OreDropdown, DropdownProps>({
  events: {
    onChange: "change",
    onOpenChange: "open-change",
  },
  model: {
    callback: "onValueChange",
    event: "change",
    property: "value",
  },
  properties: ["defaultOpen", "open", "value", "variant"],
  tagName: "ore-dropdown",
});
