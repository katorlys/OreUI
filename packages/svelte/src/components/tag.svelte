<script lang="ts">
  import "oreui-web/tag";
  import type { OreTag, OreTagVariant } from "oreui-web/tag";
  import type { OreComponentProps } from "../types.js";

  export type TagProps = OreComponentProps<
    OreTag,
    "outlined" | "variant"
  > & {
    variant?: OreTagVariant;
  };

  let { children, ...props }: TagProps = $props();
  let element: OreTag;

  export function getElement(): OreTag {
    return element;
  }
</script>

<ore-tag bind:this={element} {...props}>
  {@render children?.()}
</ore-tag>