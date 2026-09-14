import { defineComponent, h, nextTick, onMounted, onUpdated } from "vue";

export const Textarea = defineComponent({
  name: "Textarea",
  inheritAttrs: false,
  props: {
    description: String,
    error: String,
    label: String,
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLTextAreaElement | null = null;
    const generatedId = `ore-textarea-${crypto.randomUUID()}`;

    const syncValidity = (): void => {
      element?.setCustomValidity(props.error ?? "");
    };

    onMounted(syncValidity);
    onUpdated(() => void nextTick(syncValidity));
    expose({ getElement: () => element });

    return () => {
      const textareaId = String(attrs.id ?? generatedId);
      const textareaAttrs = { ...attrs } as Record<string, unknown>;
      delete textareaAttrs.class;
      delete textareaAttrs.style;
      const descriptionId = props.description
        ? `${textareaId}-description`
        : undefined;
      const errorId = props.error ? `${textareaId}-error` : undefined;

      return h(
        "div",
        { class: ["ore-textarea", attrs.class], style: attrs.style },
        [
          props.label
            ? h(
                "label",
                { class: "ore-textarea-label", for: textareaId },
                props.label,
              )
            : null,
          h("span", { class: "ore-textarea-control" }, [
            slots.default?.(),
            h("textarea", {
              ...textareaAttrs,
              "aria-describedby":
                [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
              "aria-invalid": props.error ? "true" : undefined,
              class: "ore-textarea-input",
              id: textareaId,
              onInput: (event: Event) => {
                if (typeof attrs.onInput === "function") {
                  attrs.onInput(event);
                }
                emit(
                  "update:modelValue",
                  (event.currentTarget as HTMLTextAreaElement).value,
                );
              },
              ref: (value: unknown) => {
                element = value as HTMLTextAreaElement | null;
              },
              value: props.modelValue ?? attrs.value,
            }),
          ]),
          props.description
            ? h(
                "span",
                { class: "ore-textarea-description", id: descriptionId },
                props.description,
              )
            : null,
          props.error
            ? h(
                "span",
                {
                  "aria-live": "polite",
                  class: "ore-textarea-error",
                  id: errorId,
                },
                props.error,
              )
            : null,
        ],
      );
    };
  },
});
