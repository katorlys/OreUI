import { OreTextarea } from "oreui-web/textarea";
import { createOreComponent } from "../factory.js";

export const Textarea = createOreComponent("ore-textarea", {
  displayName: "Textarea",
  model: {
    property: "value",
    event: "input",
    getValue: (element) => (element as OreTextarea).value,
  },
});
