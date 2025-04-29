import { ChangeEvent, ReactNode, HTMLProps, forwardRef, Ref } from "react";
import { nanoid } from "nanoid";

export interface NumberInputProps
  extends Omit<
    HTMLProps<HTMLInputElement>,
    "width" | "label" | "onChange" | "type" | "value"
  > {
  /** A label for the input. */
  label?: ReactNode;
  /** A CSS value to set for the width, provided as a convenience for tweaking form layouts. */
  width?: string;
  /** Additional context about this input. Displayed below the input. */
  helpText?: ReactNode;
  /** An ID to be given to the input element. Used to link the label to the input. */
  id?: string;
  /** This node will be rendered in the label row, on the right side of the input.
   *  Use it to link to more detailed information on the input.
   */
  learnMore?: ReactNode;
  /** Right-aligned inline helper string or component e.g. unit of measurement or icon */
  suffix?: ReactNode;
  /** A form validation error to display below the input. */
  error?: string | false;
  /** The new numeric value is provided as a convenience for state updaters. */
  onChange?: (newValue: number, e: ChangeEvent<HTMLInputElement>) => void;
  value?: number | null;
}

/**
 * Just like an HTML `<input type="number">` element, but with optional built-in label and error feedback.
 * Use a NumberInput when you want to collect a number from the user.
 *
 * Try to set the width to the expected input length as a hint to the user of how much text to use.
 *
 * In addition to the documented props, it supports all the props a normal `<input type="number">` would.
 */
export default forwardRef(function NumberInput(
  {
    id = nanoid(),
    value,
    max,
    min,
    onChange,
    disabled,
    ...otherProps
  }: NumberInputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      type="number"
      id={id}
      ref={ref}
      value={value ?? ""}
      min={min}
      max={max}
      disabled={disabled}
      {...otherProps}
      onChange={(e) => onChange?.(Number.parseFloat(e.target.value), e)}
    />
  );
});
