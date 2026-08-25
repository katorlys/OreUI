import { createRenderEffect, splitProps, type JSX } from "solid-js";

export type TextareaProps = Omit<
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "children" | "oninput" | "value"
> & {
  children?: JSX.Element;
  description?: string;
  error?: string;
  label?: string;
  onInput?: (event: InputEvent & { currentTarget: HTMLTextAreaElement }) => void;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Textarea(props: TextareaProps): JSX.Element {
  const [local, textareaProps] = splitProps(props, [
    "children",
    "description",
    "error",
    "id",
    "label",
    "class",
    "onInput",
    "onValueChange",
    "style",
    "value",
  ]);
  let element: HTMLTextAreaElement | undefined;
  const generatedId = `ore-textarea-${crypto.randomUUID()}`;

  createRenderEffect(() => {
    element?.setCustomValidity(local.error ?? "");
  });

  const textareaId = () => local.id ?? generatedId;
  const descriptionId = () =>
    local.description ? `${textareaId()}-description` : undefined;
  const errorId = () => (local.error ? `${textareaId()}-error` : undefined);

  return (
    <div
      class="ore-textarea"
      classList={{ [local.class ?? ""]: true }}
      style={local.style}
    >
      {local.label ? (
        <label class="ore-textarea-label" for={textareaId()}>
          {local.label}
        </label>
      ) : null}
      <span class="ore-textarea-control">
        {local.children}
        <textarea
          {...textareaProps}
          aria-describedby={
            [descriptionId(), errorId()].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={local.error ? "true" : undefined}
          class="ore-textarea-input"
          id={textareaId()}
          onInput={(event) => {
            local.onInput?.(event);
            local.onValueChange?.(event.currentTarget.value);
          }}
          ref={(value) => {
            element = value;
          }}
          value={local.value}
        />
      </span>
      {local.description ? (
        <span class="ore-textarea-description" id={descriptionId()}>
          {local.description}
        </span>
      ) : null}
      {local.error ? (
        <span class="ore-textarea-error" id={errorId()} aria-live="polite">
          {local.error}
        </span>
      ) : null}
    </div>
  );
}
