import type { OreContainerVariant } from "oreui-web/container";
import type { JSX } from "solid-js";

export type ContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {
  variant?: OreContainerVariant;
};

export function Container(props: ContainerProps): JSX.Element {
  const { variant = "dark", class: className, ...rest } = props;

  return (
    <div
      {...rest}
      class={`ore-container ${className ?? ""}`}
      data-variant={variant}
    />
  );
}
