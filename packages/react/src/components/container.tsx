import React from "react";

import type { OreContainerVariant } from "oreui-web/container";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: OreContainerVariant;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, variant = "dark", ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={
          props.className ? `ore-container ${props.className}` : "ore-container"
        }
        data-variant={variant}
      >
        {children}
      </div>
    );
  },
);