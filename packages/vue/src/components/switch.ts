import { OreSwitch } from "oreui-web/switch";
import { createOreComponent } from "../factory.js";

export const Switch = createOreComponent("ore-switch", {
  displayName: "Switch",
  model: {
    property: "checked",
    event: "input",
    getValue: (element) => (element as OreSwitch).checked,
  },
});
