import { defineComponent, h } from "vue";

export const Switch = defineComponent({
  name: "Switch",
  inheritAttrs: false,
  props: {
    color: String,
    labelClass: String,
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    variant: String,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLInputElement | null = null;

    expose({ getElement: () => element });

    return () => {
      const { class: inputClass, ...inputAttrs } = attrs;

      return h("label", { class: props.labelClass }, [
        h("input", {
          ...inputAttrs,
          class: ["ore-switch", inputClass],
          checked: props.modelValue ?? attrs.checked,
          "data-color": props.color,
          "data-variant": props.variant,
          onInput: (event: Event) => {
            if (typeof attrs.onInput === "function") {
              attrs.onInput(event);
            }
            emit(
              "update:modelValue",
              (event.currentTarget as HTMLInputElement).checked,
            );
          },
          ref: (value) => {
            element = value as HTMLInputElement | null;
          },
          role: "switch",
          type: "checkbox",
        }),
        slots.default?.(),
      ]);
    };
  },
});
