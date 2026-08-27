import "oreui-web/table";
import type {
  OreTableSortDetail,
  OreTableVariant,
} from "oreui-web/table";
import React, { useEffect, useImperativeHandle, useRef } from "react";

export type TableProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onSort"> & {
  onSort?: (event: CustomEvent<OreTableSortDetail>) => void;
  variant?: OreTableVariant;
};

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  function Table({ children, className, onSort, variant, ...props }, ref) {
    const elementRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);
    useEffect(() => {
      const element = elementRef.current;

      if (!element || !onSort) {
        return;
      }

      const listener = (event: Event) =>
        onSort(event as CustomEvent<OreTableSortDetail>);
      element.addEventListener("sort", listener);
      return () => element.removeEventListener("sort", listener);
    }, [onSort]);

    return React.createElement(
      "div",
      {
        ...props,
        "data-variant": variant,
        className: className
          ? `ore-table ore-scrollbar ${className}`
          : "ore-table ore-scrollbar",
        ref: elementRef,
      },
      children,
    );
  },
);
