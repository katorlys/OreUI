import { css } from "lit";

export const oreUIColorStyles = css`
  :host([color="legends"]) {
    --oreui-control-surface: var(--oreui-color-legends-surface, #4ad5ff);
    --oreui-control-surface-hover: var(
      --oreui-color-legends-surface-hover,
      #0f6ac1
    );
    --oreui-control-surface-focus: var(--oreui-color-legends-surface, #4ad5ff);
    --oreui-control-highlight: var(--oreui-color-legends-highlight, #acf2ff);
    --oreui-control-shadow: var(--oreui-color-legends-shadow, #06346e);
    --oreui-control-text: var(--oreui-color-legends-text, #001236);
    --oreui-control-disabled-surface: var(
      --oreui-color-legends-disabled-surface,
      #0f6ac1
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-legends-disabled-highlight,
      #3fb9eb
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-legends-mark-mid, #083e7c);
    --oreui-checkbox-mark-light: var(--oreui-color-legends-mark-light, #307fd0);
    --oreui-checkbox-mark-dark: var(--oreui-color-legends-mark-dark, #001236);
  }

  :host([color="minecraft"]) {
    --oreui-control-surface: var(--oreui-color-minecraft-surface, #52a535);
    --oreui-control-surface-hover: var(
      --oreui-color-minecraft-surface-hover,
      #2a641c
    );
    --oreui-control-surface-focus: var(
      --oreui-color-minecraft-surface,
      #52a535
    );
    --oreui-control-highlight: var(--oreui-color-minecraft-highlight, #75b75d);
    --oreui-control-shadow: var(--oreui-color-minecraft-shadow, #1d4d13);
    --oreui-control-text: var(--oreui-color-minecraft-text, #ffffff);
    --oreui-control-disabled-surface: var(
      --oreui-color-minecraft-disabled-surface,
      #2a641c
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-minecraft-disabled-highlight,
      #558349
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-minecraft-mark-mid, #e6e8eb);
    --oreui-checkbox-mark-light: var(
      --oreui-color-minecraft-mark-light,
      #ffffff
    );
    --oreui-checkbox-mark-dark: var(--oreui-color-minecraft-mark-dark, #d0d1d4);
  }

  :host([color="dungeons"]) {
    --oreui-control-surface: var(--oreui-color-dungeons-surface, #ffa41f);
    --oreui-control-surface-hover: var(
      --oreui-color-dungeons-surface-hover,
      #ca7b07
    );
    --oreui-control-surface-focus: var(--oreui-color-dungeons-surface, #ffa41f);
    --oreui-control-highlight: var(--oreui-color-dungeons-highlight, #fff27a);
    --oreui-control-shadow: var(--oreui-color-dungeons-shadow, #ff791a);
    --oreui-control-text: var(--oreui-color-dungeons-text, #8f1f0b);
    --oreui-control-disabled-surface: var(
      --oreui-color-dungeons-disabled-surface,
      #3b2100
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-dungeons-disabled-highlight,
      #693e20
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-dungeons-mark-mid, #c07c2a);
    --oreui-checkbox-mark-light: var(
      --oreui-color-dungeons-mark-light,
      #ffdf61
    );
    --oreui-checkbox-mark-dark: var(--oreui-color-dungeons-mark-dark, #a34410);
  }

  :host([color="destructive"]) {
    --oreui-control-surface: var(--oreui-color-destructive-surface, #ca3636);
    --oreui-control-surface-hover: var(
      --oreui-color-destructive-surface-hover,
      #c02d2d
    );
    --oreui-control-surface-focus: var(
      --oreui-color-destructive-surface,
      #ca3636
    );
    --oreui-control-highlight: var(
      --oreui-color-destructive-highlight,
      #d55e5e
    );
    --oreui-control-shadow: var(--oreui-color-destructive-shadow, #ad1d1d);
    --oreui-control-text: var(--oreui-color-destructive-text, #ffffff);
    --oreui-control-disabled-surface: var(
      --oreui-color-destructive-disabled-surface,
      #c02d2d
    );
    --oreui-control-disabled-highlight: var(
      --oreui-color-destructive-disabled-highlight,
      #b24b4b
    );
    --oreui-checkbox-mark-mid: var(--oreui-color-destructive-mark-mid, #e6e8eb);
    --oreui-checkbox-mark-light: var(
      --oreui-color-destructive-mark-light,
      #ffffff
    );
    --oreui-checkbox-mark-dark: var(
      --oreui-color-destructive-mark-dark,
      #d0d1d4
    );
  }
`;
