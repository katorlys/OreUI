import React from "react";

export type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  function Divider(props, ref): React.ReactElement {
    return <hr {...props} ref={ref} className={props.className ? `ore-divider ${props.className}` : "ore-divider"} />;
  },
);
