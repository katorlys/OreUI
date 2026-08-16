import "oreui-web/spinner";

import type { OreSpinner } from "oreui-web/spinner";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type SpinnerProps = OreComponentProps<OreSpinner>;

export const Spinner = createOreComponent<OreSpinner, SpinnerProps>({
  tagName: "ore-spinner",
});