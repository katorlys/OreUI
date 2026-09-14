import React from "react";

export type NavbarProps = React.HTMLAttributes<HTMLElement>;

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  function Navbar({ children, ...props }, ref) {
    return (
      <nav
        {...props}
        ref={ref}
        className={
          props.className ? `ore-navbar ${props.className}` : "ore-navbar"
        }
      >
        {children}
      </nav>
    );
  },
);
