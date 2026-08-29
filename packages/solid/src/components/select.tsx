import { splitProps, type JSX } from "solid-js";

export type SelectProps = Omit<
  JSX.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> & {
  onChange?: (event: Event & { currentTarget: HTMLSelectElement }) => void;
  onValueChange?: (value: string) => void;
};

export function Select(props: SelectProps): JSX.Element {
  const [local, selectProps] = splitProps(props, ["onChange", "onValueChange"]);

  return (
    <select
      {...selectProps}
      onChange={(event) => {
        local.onChange?.(event);
        local.onValueChange?.(event.currentTarget.value);
      }}
    />
  );
}
