import "oreui-web/card";

import type { OreCard } from "oreui-web/card";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type CardProps = OreComponentProps<OreCard>;

export const Card = createOreComponent<OreCard, CardProps>({
  tagName: "ore-card",
});
