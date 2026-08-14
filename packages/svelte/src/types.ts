import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type OreComponentProps<
  Element extends HTMLElement,
  Property extends keyof Element = never,
> = Omit<HTMLAttributes<Element>, Property | "children"> &
  Partial<Pick<Element, Property>> & {
    children?: Snippet;
  };
