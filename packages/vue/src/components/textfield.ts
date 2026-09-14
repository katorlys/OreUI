import { defineComponent, h, nextTick, onMounted, onUpdated } from "vue";

export const Textfield = defineComponent({
  name: "Textfield",
  inheritAttrs: false,
  props: {
    description: String,
    error: String,
    label: String,
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLInputElement | null = null;
    const generatedId = `ore-textfield-${crypto.randomUUID()}`;

    const syncValidity = (): void => {
      element?.setCustomValidity(props.error ?? "");
    };

    onMounted(syncValidity);
    onUpdated(() => void nextTick(syncValidity));
    expose({ getElement: () => element });

    return () => {
      const inputId = String(attrs.id ?? generatedId);
      const inputAttrs = { ...attrs } as Record<string, unknown>;
      delete inputAttrs.class;
      delete inputAttrs.style;
      const descriptionId = props.description
        ? `${inputId}-description`
        : undefined;
      const errorId = props.error ? `${inputId}-error` : undefined;

      return h(
        "div",
        { class: ["ore-textfield", attrs.class], style: attrs.style },
        [
          props.label
            ? h(
                "label",
                { class: "ore-textfield-label", for: inputId },
                props.label,
              )
            : null,
          h("span", { class: "ore-textfield-control" }, [
            slots.default?.(),
            h("input", {
              ...inputAttrs,
              "aria-describedby":
                [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
              "aria-invalid": props.error ? "true" : undefined,
              class: "ore-textfield-input",
              id: inputId,
              onInput: (event: Event) => {
                if (typeof attrs.onInput === "function") {
                  attrs.onInput(event);
                }
                emit(
                  "update:modelValue",
                  (event.currentTarget as HTMLInputElement).value,
                );
              },
              ref: (value: unknown) => {
                element = value as HTMLInputElement | null;
              },
              value: props.modelValue ?? attrs.value,
            }),
          ]),
          props.description
            ? h(
                "span",
                { class: "ore-textfield-description", id: descriptionId },
                props.description,
              )
            : null,
          props.error
            ? h(
                "span",
                {
                  "aria-live": "polite",
                  class: "ore-textfield-error",
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
