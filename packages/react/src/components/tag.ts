import { createComponent } from "@lit/react";
import { OreTag as OreTagElement } from "oreui-web/tag";
import React from "react";

export const Tag = createComponent({
  react: React,
  tagName: "ore-tag",
  elementClass: OreTagElement,
  displayName: "Tag",
});

export type TagProps = React.ComponentProps<typeof Tag>;
