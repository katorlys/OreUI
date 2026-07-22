import { css } from "lit";

export const oreUIColorStyles = css`
  :host([color="legends"]) {
    --oreui-control-surface: var(--oreui-color-legends-surface);
    --oreui-control-surface-hover: var(--oreui-color-legends-surface-hover);
    --oreui-control-surface-focus: var(--oreui-color-legends-surface);
    --oreui-control-highlight: var(--oreui-color-legends-highlight);
    --oreui-control-shadow: var(--oreui-color-legends-shadow);
    --oreui-control-text: var(--oreui-color-legends-text);
    --oreui-control-disabled-surface: var(
      --oreui-color-legends-disabled-surface
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-legends-disabled-highlight
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-legends-mark-mid);
    --oreui-checkbox-mark-light: var(--oreui-color-legends-mark-light);
    --oreui-checkbox-mark-dark: var(--oreui-color-legends-mark-dark);
  }

  :host([color="minecraft"]) {
    --oreui-control-surface: var(--oreui-color-minecraft-surface);
    --oreui-control-surface-hover: var(--oreui-color-minecraft-surface-hover);
    --oreui-control-surface-focus: var(--oreui-color-minecraft-surface);
    --oreui-control-highlight: var(--oreui-color-minecraft-highlight);
    --oreui-control-shadow: var(--oreui-color-minecraft-shadow);
    --oreui-control-text: var(--oreui-color-minecraft-text);
    --oreui-control-disabled-surface: var(
      --oreui-color-minecraft-disabled-surface
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-minecraft-disabled-highlight
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-minecraft-mark-mid);
    --oreui-checkbox-mark-light: var(--oreui-color-minecraft-mark-light);
    --oreui-checkbox-mark-dark: var(--oreui-color-minecraft-mark-dark);
  }

  :host([color="dungeons"]) {
    --oreui-control-surface: var(--oreui-color-dungeons-surface);
    --oreui-control-surface-hover: var(--oreui-color-dungeons-surface-hover);
    --oreui-control-surface-focus: var(--oreui-color-dungeons-surface);
    --oreui-control-highlight: var(--oreui-color-dungeons-highlight);
    --oreui-control-shadow: var(--oreui-color-dungeons-shadow);
    --oreui-control-text: var(--oreui-color-dungeons-text);
    --oreui-control-disabled-surface: var(
      --oreui-color-dungeons-disabled-surface
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-dungeons-disabled-highlight
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-dungeons-mark-mid);
    --oreui-checkbox-mark-light: var(--oreui-color-dungeons-mark-light);
    --oreui-checkbox-mark-dark: var(--oreui-color-dungeons-mark-dark);
  }

  :host([color="destructive"]) {
    --oreui-control-surface: var(--oreui-color-destructive-surface);
    --oreui-control-surface-hover: var(--oreui-color-destructive-surface-hover);
    --oreui-control-surface-focus: var(--oreui-color-destructive-surface);
    --oreui-control-highlight: var(--oreui-color-destructive-highlight);
    --oreui-control-shadow: var(--oreui-color-destructive-shadow);
    --oreui-control-text: var(--oreui-color-destructive-text);
    --oreui-control-disabled-surface: var(
      --oreui-color-destructive-disabled-surface
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-destructive-disabled-highlight
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-destructive-mark-mid);
    --oreui-checkbox-mark-light: var(--oreui-color-destructive-mark-light);
    --oreui-checkbox-mark-dark: var(--oreui-color-destructive-mark-dark);
  }
`;
