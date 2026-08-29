import "oreui-web/tooltip";
import type { OreTooltipSide } from "oreui-web/tooltip";
import React, { useEffect, useImperativeHandle, useRef } from "react";

export type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  defaultOpen?: boolean;
  delay?: number;
  onOpenChange?: (event: CustomEvent<boolean>) => void;
  open?: boolean;
  side?: OreTooltipSide;
};

export const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(
  function Tooltip(
    {
      children,
      className,
      defaultOpen,
      delay,
      onOpenChange,
      open,
      side = "top",
      ...props
    },
    ref,
  ) {
    const elementRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => elementRef.current as HTMLSpanElement);
    useEffect(() => {
      const element = elementRef.current;

      if (!element || !onOpenChange) {
        return;
      }

      const listener = (event: Event) =>
        onOpenChange(event as CustomEvent<boolean>);
      element.addEventListener("oreui:openchange", listener);
      return () => element.removeEventListener("oreui:openchange", listener);
    }, [onOpenChange]);

    return React.createElement(
      "span",
      {
        ...props,
        "data-default-open": defaultOpen ? "" : undefined,
        "data-delay": delay,
        "data-open": open === undefined ? undefined : String(open),
        "data-side": side,
        className: className ? `ore-tooltip ${className}` : "ore-tooltip",
        ref: elementRef,
      },
      children,
    );
  },
);
