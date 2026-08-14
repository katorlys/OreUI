<script lang="ts">
  import "oreui-web/navbar";
  import type { OreNavbar } from "oreui-web/navbar";
  import type { OreComponentProps } from "../types.js";

  export type NavbarProps = OreComponentProps<OreNavbar>;

  let { children, ...props }: NavbarProps = $props();
  let element: OreNavbar;

  export function getElement(): OreNavbar {
    return element;
  }
</script>

<ore-navbar bind:this={element} {...props}>
  {@render children?.()}
</ore-navbar>