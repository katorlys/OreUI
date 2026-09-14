import { defineComponent, h, type PropType } from "vue";

export const Select = defineComponent({
  name: "Select",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | string[]>,
      default: undefined,
    },
  },
  emits: ["change", "update:modelValue"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLSelectElement | null = null;
    expose({ getElement: () => element });

    return () => {
      const { class: selectClass, ...selectAttrs } = attrs;

      return h(
        "select",
        {
          ...selectAttrs,
          class: ["ore-select", selectClass],
          onChange: (event: Event) => {
            const select = event.currentTarget as HTMLSelectElement;
            const value = select.multiple
              ? Array.from(select.selectedOptions, (option) => option.value)
              : select.value;

            emit("change", event);
            emit("update:modelValue", value);
          },
          ref: (value: unknown) => {
            element = value as HTMLSelectElement | null;
          },
          value: props.modelValue,
        },
        slots.default?.(),
      );
    };
  },
});
