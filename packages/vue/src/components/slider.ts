import { OreSlider } from "oreui-web/slider";
import { createOreComponent } from "../factory.js";

export const Slider = createOreComponent("ore-slider", {
  displayName: "Slider",
  model: {
    property: "value",
    event: "input",
    getValue: (element) => (element as OreSlider).value,
  },
});
