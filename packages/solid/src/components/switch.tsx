import { splitProps, type JSX } from "solid-js";

export type SwitchProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  labelClass?: string;
  onCheckedChange?: (checked: boolean) => void;
  variant?: string;
};

export function Switch(props: SwitchProps): JSX.Element {
  const [local, inputProps] = splitProps(props, [
    "children",
    "color",
    "labelClass",
    "onCheckedChange",
    "onInput",
    "variant",
  ]);

  return (
    <label class={local.labelClass}>
      <input
        {...inputProps}
        data-color={local.color}
        data-variant={local.variant}
        onInput={(event) => {
          if (typeof local.onInput === "function") {
            local.onInput(event);
          }
          local.onCheckedChange?.(event.currentTarget.checked);
        }}
        role="switch"
        type="checkbox"
      />
      {local.children}
    </label>
  );
}
