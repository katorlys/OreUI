import React from "react";

export type ModalProps = React.DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  function Modal({ children, ...props }, ref) {
    return React.createElement(
      "dialog",
      {
        ...props,
        className: props.className
          ? `ore-modal ${props.className}`
          : "ore-modal",
        ref,
      },
      children,
    );
  },
);
