import { syncSlider } from "oreui-web/slider";
import { defineComponent, h, onMounted, onUpdated } from "vue";

export const Slider = defineComponent({
  name: "Slider",
  inheritAttrs: false,
  props: {
    color: String,
    modelValue: {
      type: Number,
      default: undefined,
    },
    orientation: String,
    variant: String,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, expose }) {
    let element: HTMLInputElement | null = null;

    const sync = (): void => {
      if (element) {
        syncSlider(element);
      }
    };

    onMounted(sync);
    onUpdated(sync);

    expose({ getElement: () => element });

    return () => {
      const { class: inputClass, ...inputAttrs } = attrs;

      return h("input", {
        ...inputAttrs,
        class: ["ore-slider", inputClass],
        "aria-orientation": props.orientation,
        "data-color": props.color,
        "data-orientation": props.orientation,
        "data-variant": props.variant,
        onInput: (event: Event) => {
          if (typeof attrs.onInput === "function") {
            attrs.onInput(event);
          }
          emit(
            "update:modelValue",
            (event.currentTarget as HTMLInputElement).valueAsNumber,
          );
        },
        ref: (value) => {
          element = value as HTMLInputElement | null;
        },
        type: "range",
        value: props.modelValue ?? attrs.value,
      });
    };
  },
});
