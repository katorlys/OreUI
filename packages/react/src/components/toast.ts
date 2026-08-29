import "oreui-web/toast";
import type { OreToastPosition, OreToastVariant } from "oreui-web/toast";
import React, { useEffect, useImperativeHandle, useRef } from "react";

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean;
  duration?: number;
  onOpenChange?: (event: CustomEvent<boolean>) => void;
  open?: boolean;
  position?: OreToastPosition;
  variant?: OreToastVariant;
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  function Toast(
    {
      children,
      className,
      defaultOpen,
      duration,
      onOpenChange,
      open,
      position = "bottom-center",
      variant = "neutral",
      ...props
    },
    ref,
  ) {
    const elementRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);
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
      "div",
      {
        ...props,
        "data-default-open": defaultOpen ? "" : undefined,
        "data-duration": duration,
        "data-open": open ? "" : undefined,
        "data-position": position,
        "data-variant": variant,
        className: className ? `ore-toast ${className}` : "ore-toast",
        ref: elementRef,
      },
      children,
    );
  },
);
