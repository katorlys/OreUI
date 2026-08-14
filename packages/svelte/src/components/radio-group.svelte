<script lang="ts">
  import "oreui-web/radio-group";
  import type { OreRadioGroup } from "oreui-web/radio-group";
  import type { OreComponentProps } from "../types.js";

  export type RadioGroupProps = OreComponentProps<OreRadioGroup>;

  let { children, ...props }: RadioGroupProps = $props();
  let element: OreRadioGroup;

  export function getElement(): OreRadioGroup {
    return element;
  }
</script>

<ore-radio-group bind:this={element} {...props}>
  {@render children?.()}
</ore-radio-group>