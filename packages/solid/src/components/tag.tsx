import type { JSX } from "solid-js";

export type TagProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  variant?: string;
  outlined?: boolean;
};

export function Tag(props: TagProps): JSX.Element {
  const { variant, outlined, class: className, ...rest } = props;

  return (
    <span
      {...rest}
      class={`ore-tag ${className ?? ""}`}
      data-variant={variant}
      data-outlined={outlined ? "" : undefined}
    />
  );
}
