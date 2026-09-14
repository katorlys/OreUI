import { defineComponent, h } from "vue";

export const Radio = defineComponent({
  name: "Radio",
  inheritAttrs: false,
  props: {
    color: String,
    labelClass: String,
  },
  setup(props, { attrs, expose, slots }) {
    let element: HTMLInputElement | null = null;

    expose({ getElement: () => element });

    return () => {
      const { class: inputClass, ...inputAttrs } = attrs;

      return h("label", { class: props.labelClass }, [
        h("input", {
          ...inputAttrs,
          class: ["ore-radio", inputClass],
          "data-color": props.color,
          ref: (value) => {
            element = value as HTMLInputElement | null;
          },
          type: "radio",
        }),
        slots.default?.(),
      ]);
    };
  },
});
