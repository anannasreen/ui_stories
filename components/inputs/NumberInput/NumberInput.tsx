import { isNumber } from 'lodash';
import React, { ChangeEvent, ReactNode, HTMLProps, forwardRef, Ref } from 'react';
import { nanoid } from 'nanoid';
import FormGroup from '../FormGroup';

export interface NumberInputProps
    extends Omit<HTMLProps<HTMLInputElement>, 'width' | 'label' | 'onChange' | 'type' | 'value'> {
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
    onChange?: (newValue: number, e: ChangeEvent<HTMLInputElement>) => any;
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
        width,
        label,
        className,
        helpText,
        learnMore,
        error,
        value,
        max,
        min,
        onChange,
        disabled,
        suffix,
        ...otherProps
    }: NumberInputProps,
    ref: Ref<HTMLInputElement>,
) {
    const tooLow = isNumber(value) && isNumber(min) && value < min;
    const tooHigh = isNumber(value) && isNumber(max) && value > max;
    const augmentedError =
        error ||
        (tooLow && `This value can't be less than ${min}.`) ||
        (tooHigh && `This value can't be greater than ${max}.`);

    return (
        <FormGroup
            id={id}
            className={className}
            style={{ width }}
            label={label}
            learnMore={learnMore}
            helpText={helpText}
            error={augmentedError}
            disabled={disabled}
            suffix={suffix}
        >
            <input
                type="number"
                id={id}
                ref={ref}
                value={isNumber(value) && !Number.isNaN(value) ? value : ''}
                min={min}
                max={max}
                disabled={disabled}
                {...otherProps}
                onChange={(e) => onChange?.(Number.parseFloat(e.target.value), e)}
            />
        </FormGroup>
    );
});
