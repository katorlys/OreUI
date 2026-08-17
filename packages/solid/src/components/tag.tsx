import "oreui-web/tag";

import type { OreTag } from "oreui-web/tag";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TagProps = OreComponentProps<OreTag, "outlined" | "variant">;

export const Tag = createOreComponent<OreTag, TagProps>({
  properties: ["outlined", "variant"],
  tagName: "ore-tag",
});
