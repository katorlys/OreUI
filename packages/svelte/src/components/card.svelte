<script lang="ts">
  import "oreui-web/card";
  import type { OreCard } from "oreui-web/card";
  import type { OreComponentProps } from "../types.js";

  export type CardProps = OreComponentProps<OreCard>;

  let { children, ...props }: CardProps = $props();
  let element: OreCard;

  export function getElement(): OreCard {
    return element;
  }
</script>

<ore-card bind:this={element} {...props}>
  {@render children?.()}
</ore-card>