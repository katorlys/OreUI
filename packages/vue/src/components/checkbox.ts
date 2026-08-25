import { defineComponent, h } from "vue";

export const Checkbox = defineComponent({
  name: "Checkbox",
  inheritAttrs: false,
  props: {
    color: String,
    labelClass: String,
    modelValue: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLInputElement | null = null;

    expose({ getElement: () => element });

    return () =>
      h("label", { class: props.labelClass }, [
        h("input", {
          ...attrs,
          checked: props.modelValue ?? attrs.checked,
          "data-color": props.color,
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
          type: "checkbox",
        }),
        slots.default?.(),
      ]);
  },
});
