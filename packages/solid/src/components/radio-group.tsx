import { splitProps, type JSX } from "solid-js";

export type RadioGroupProps = JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const [local, fieldsetProps] = splitProps(props, ["class"]);

  return (
    <fieldset
      {...fieldsetProps}
      class={["ore-radio-group", local.class].filter(Boolean).join(" ")}
    />
  );
}
