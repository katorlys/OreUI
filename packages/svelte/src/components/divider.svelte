<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export type DividerProps = HTMLAttributes<HTMLHRElement>;

  let { class: className, ...props }: DividerProps = $props();

  export function getElement(): HTMLHRElement | undefined {
    return undefined;
  }
</script>

<hr class="ore-divider {className ?? ''}" {...props} />