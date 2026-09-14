import { splitProps, type JSX } from "solid-js";

export type CheckboxProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  labelClass?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export function Checkbox(props: CheckboxProps): JSX.Element {
  const [local, inputProps] = splitProps(props, [
    "children",
    "class",
    "color",
    "labelClass",
    "onCheckedChange",
    "onInput",
  ]);

  return (
    <label class={local.labelClass}>
      <input
        {...inputProps}
        class={`ore-checkbox ${local.class ?? ""}`}
        data-color={local.color}
        onInput={(event) => {
          if (typeof local.onInput === "function") {
            local.onInput(event);
          }
          local.onCheckedChange?.(event.currentTarget.checked);
        }}
        type="checkbox"
      />
      {local.children}
    </label>
  );
}
