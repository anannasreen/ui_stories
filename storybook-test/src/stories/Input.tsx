import React from "react";

import "./input.css";

export interface InputProps {
  /** How large should the input be? */
  size?: "small" | "medium" | "large";
  /** Placeholder text for the input */
  placeholder?: string;
  /** Value of the input */
  value?: string;
  /** Optional change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Primary UI component for user input */
export const Input = ({
  size = "medium",
  placeholder = "",
  value,
  ...props
}: InputProps) => {
  return (
    <input
      type="text"
      className={["storybook-input", `storybook-input--${size}`].join(" ")}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
};
