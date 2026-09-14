import React from "react";

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "children" | "color"
> & {
  description?: string;
  error?: string;
  label?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, description, error, id, label, onInput, style, ...props },
    ref,
  ): React.ReactElement {
    const generatedId = React.useId();
    const textareaId = id ?? `ore-textarea-${generatedId}`;
    const descriptionId = description ? `${textareaId}-description` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useEffect(() => {
      textareaRef.current?.setCustomValidity(error ?? "");
    }, [error]);

    return (
      <div
        className={className ? `ore-textarea ${className}` : "ore-textarea"}
        style={style}
      >
        {label ? (
          <label className="ore-textarea-label" htmlFor={textareaId}>
            {label}
          </label>
        ) : null}
        <span className="ore-textarea-control">
          <textarea
            {...props}
            ref={(element) => {
              textareaRef.current = element;
              if (typeof ref === "function") {
                ref(element);
              } else if (ref) {
                ref.current = element;
              }
            }}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? true : undefined}
            className="ore-textarea-input"
            id={textareaId}
            onInput={onInput}
          />
        </span>
        {description ? (
          <span className="ore-textarea-description" id={descriptionId}>
            {description}
          </span>
        ) : null}
        {error ? (
          <span className="ore-textarea-error" id={errorId} aria-live="polite">
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);
