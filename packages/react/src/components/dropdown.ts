import "oreui-web/dropdown";
import type {
  OreDropdownChangeDetail,
  OreDropdownVariant,
} from "oreui-web/dropdown";
import React, { useEffect, useImperativeHandle, useRef } from "react";

export type DropdownProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  onChange?: (event: CustomEvent<OreDropdownChangeDetail>) => void;
  value?: string;
  variant?: OreDropdownVariant;
};

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    { children, className, onChange, value, variant, ...props },
    ref,
  ) {
    const elementRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);
    useEffect(() => {
      const element = elementRef.current;

      if (!element || !onChange) {
        return;
      }

      const listener = (event: Event) =>
        onChange(event as CustomEvent<OreDropdownChangeDetail>);
      element.addEventListener("change", listener);
      return () => element.removeEventListener("change", listener);
    }, [onChange]);

    return React.createElement(
      "div",
      {
        ...props,
        "data-value": value,
        "data-variant": variant ?? "borderless",
        className: className ? `ore-dropdown ${className}` : "ore-dropdown",
        ref: elementRef,
      },
      children,
    );
  },
);
