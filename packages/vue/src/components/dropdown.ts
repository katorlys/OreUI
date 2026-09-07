import "oreui-web/dropdown";
import type {
  OreDropdownChangeDetail,
  OreDropdownVariant,
} from "oreui-web/dropdown";
import { defineComponent, h, type PropType } from "vue";

export const Dropdown = defineComponent({
  name: "Dropdown",
  inheritAttrs: false,
  props: {
    modelValue: String,
    variant: {
      type: String as PropType<OreDropdownVariant>,
      default: "borderless",
    },
  },
  emits: ["change", "update:modelValue"],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-value": props.modelValue,
          "data-variant": props.variant,
          class: ["ore-dropdown", attrs.class],
          onChange: (event: CustomEvent<OreDropdownChangeDetail>) => {
            emit("change", event);
            emit("update:modelValue", event.detail.value);
          },
        },
        slots.default?.(),
      );
  },
});
