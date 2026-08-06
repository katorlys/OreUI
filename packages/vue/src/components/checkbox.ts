import { OreCheckbox } from "@katorlys/oreui/checkbox";
import { createOreComponent } from "../factory.js";

export const Checkbox = createOreComponent("ore-checkbox", {
  displayName: "Checkbox",
  model: {
    property: "checked",
    event: "input",
    getValue: (element) => (element as OreCheckbox).checked,
  },
});
