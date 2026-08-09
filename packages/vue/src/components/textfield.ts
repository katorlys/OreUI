import { OreTextfield } from "oreui-web/textfield";
import { createOreComponent } from "../factory.js";

export const Textfield = createOreComponent("ore-textfield", {
  displayName: "Textfield",
  model: {
    property: "value",
    event: "input",
    getValue: (element) => (element as OreTextfield).value,
  },
});
