import { OreDropdown } from "@katorlys/oreui/dropdown";
import { createOreComponent } from "../factory.js";

export const Dropdown = createOreComponent("ore-dropdown", {
  displayName: "Dropdown",
  model: {
    property: "value",
    event: "change",
    getValue: (element) => (element as OreDropdown).value,
  },
});
