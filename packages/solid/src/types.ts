import type { JSX } from "solid-js";

export type OreRef<Element extends HTMLElement> = (element: Element) => void;

export type OreComponentProps<
  Element extends HTMLElement,
  Property extends keyof Element = never,
> = Omit<JSX.HTMLAttributes<Element>, Property | "ref"> &
  Partial<Pick<Element, Property>> & {
    ref?: OreRef<Element>;
  };

export type OpenChangeProps = {
  onOpenChange?: (event: CustomEvent<boolean>) => void;
};
