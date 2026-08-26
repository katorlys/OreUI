import React from "react";

export type CardProps = React.HTMLAttributes<HTMLElement>;

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { children, ...props },
  ref,
) {
  return (
    <article
      {...props}
      ref={ref}
      className={props.className ? `ore-card ${props.className}` : "ore-card"}
    >
      {children}
    </article>
  );
});