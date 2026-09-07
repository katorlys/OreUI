import React from "react";

export type AccordionProps = React.DetailsHTMLAttributes<HTMLDetailsElement>;

export const Accordion = React.forwardRef<HTMLDetailsElement, AccordionProps>(
  function Accordion({ children, ...props }, ref) {
    return React.createElement(
      "details",
      {
        ...props,
        className: props.className
          ? `ore-accordion ${props.className}`
          : "ore-accordion",
        ref,
      },
      children,
    );
  },
);
