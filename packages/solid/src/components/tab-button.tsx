import type { JSX } from "solid-js";

export type TabButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  palette?: "default" | "toggle";
  selected?: boolean;
  variant?: string;
};

export function TabButton(props: TabButtonProps): JSX.Element {
  return (
    <button
      {...props}
      class="ore-tab-button"
      aria-selected={props.selected}
      data-palette={props.palette}
      data-variant={props.variant}
      role="tab"
    />
  );
}
