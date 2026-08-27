import type { JSX } from "solid-js";

export type ModalProps = JSX.DialogHtmlAttributes<HTMLDialogElement>;

export function Modal(props: ModalProps): JSX.Element {
  const { class: className, ...rest } = props;

  return <dialog {...rest} class={`ore-modal ${className ?? ""}`} />;
}
