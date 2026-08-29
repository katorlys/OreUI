import { defineComponent, h } from "vue";

export const TabButton = defineComponent({
  name: "TabButton",
  inheritAttrs: false,
  props: { palette: String, selected: Boolean, variant: String },
  setup(props, { attrs, slots }) {
    return () => h("button", {
      ...attrs,
      "aria-selected": props.selected,
      class: ["ore-tab-button", attrs.class],
      "data-palette": props.palette,
      "data-variant": props.variant,
      role: "tab",
    }, slots.default?.());
  },
});
