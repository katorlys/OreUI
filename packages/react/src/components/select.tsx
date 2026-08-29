import React from "react";

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "color"
>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref): React.ReactElement {
    return <select {...props} ref={ref} />;
  },
);
