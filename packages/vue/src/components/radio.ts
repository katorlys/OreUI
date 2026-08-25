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

    return () =>
      h("label", { class: props.labelClass }, [
        h("input", {
          ...attrs,
          "data-color": props.color,
          ref: (value) => {
            element = value as HTMLInputElement | null;
          },
          type: "radio",
        }),
        slots.default?.(),
      ]);
  },
});
