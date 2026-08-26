import React from "react";

export type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: string;
  outlined?: boolean;
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { children, variant, outlined, ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={props.className ? `ore-tag ${props.className}` : "ore-tag"}
      data-variant={variant}
      data-outlined={outlined ? "" : undefined}
    >
      {children}
    </span>
  );
});
