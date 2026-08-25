import { defineComponent, h } from "vue";

export const RadioGroup = defineComponent({
  name: "RadioGroup",
  setup(_, { attrs, expose, slots }) {
    let element: HTMLFieldSetElement | null = null;

    expose({ getElement: () => element });

    return () =>
      h(
        "fieldset",
        {
          ...attrs,
          class: ["ore-radio-group", attrs.class],
          ref: (value) => {
            element = value as HTMLFieldSetElement | null;
          },
        },
        slots.default?.(),
      );
  },
});
