import "oreui-web/container";

import type { OreContainer } from "oreui-web/container";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type ContainerProps = OreComponentProps<OreContainer, "variant">;

export const Container = createOreComponent<OreContainer, ContainerProps>({
  properties: ["variant"],
  tagName: "ore-container",
});
