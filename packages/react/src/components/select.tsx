import React from "react";

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "color"
>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref): React.ReactElement {
    const { className, ...selectProps } = props;

    return (
      <select
        {...selectProps}
        className={className ? `ore-select ${className}` : "ore-select"}
        ref={ref}
      />
    );
  },
);
