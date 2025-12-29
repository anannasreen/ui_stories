import React, { ChangeEvent, ReactNode, HTMLProps, forwardRef, Ref } from 'react';
import { nanoid } from 'nanoid';
import FormGroup from '../FormGroup';
import css from './TextArea.module.scss';

export interface TextAreaProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'width' | 'label' | 'onChange'> {
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
    /** A form validation error to display below the input. */
    error?: string | false;
    /** Grow textarea automatically to fit content */
    autoSize?: boolean;
    /** The new string value is provided as a convenience for state updaters. */
    onChange?: (newValue: string, e: ChangeEvent<HTMLTextAreaElement>) => any;
}

/**
 * Just like an HTML `<textarea>` element, but with optional built-in label and error feedback.
 * Use a TextArea in places where we want to capture long form text from a user.
 *
 * The input can be resized, but by default won't grow beyond the width of its container.
 *
 * In addition to the documented props, it supports all the props a normal `<textarea>` would.
 */
export default forwardRef(function TextArea(
    {
        id = nanoid(),
        width,
        label,
        className,
        helpText,
        learnMore,
        error,
        autoSize,
        onChange,
        disabled,
        ...otherProps
    }: TextAreaProps,
    ref: Ref<HTMLTextAreaElement>,
) {
    return (
        <FormGroup
            id={id}
            className={className}
            style={{ width }}
            label={label}
            learnMore={learnMore}
            helpText={helpText}
            error={error}
            disabled={disabled}
        >
            <textarea
                className={css.textArea}
                id={id}
                ref={ref}
                disabled={disabled}
                {...otherProps}
                onKeyUp={(e) => {
                    if (e.key === 'Escape') {
                        e.stopPropagation();
                        e.currentTarget.blur();
                    }
                }}
                onChange={(e) => {
                    if (autoSize) {
                        e.target.style.height = '';
                        e.target.style.height = `${e.target.scrollHeight + 3}px`;
                    }
                    onChange?.(e.target.value, e);
                }}
            />
        </FormGroup>
    );
});
