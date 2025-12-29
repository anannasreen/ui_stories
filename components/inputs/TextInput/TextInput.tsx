import React, { ChangeEvent, ReactNode, HTMLProps, forwardRef, Ref } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import FormGroup from '../FormGroup';
import styles from './TextInput.module.scss';
import { Text } from '../../Text';

export interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'width' | 'label' | 'onChange'> {
    /** A label for the input. */
    label?: ReactNode;
    /** A CSS value to set for the width, provided as a convenience for tweaking form layouts. */
    width?: React.CSSProperties['width'];
    /** Additional context about this input. Displayed below the input. */
    helpText?: ReactNode;
    /** An ID to be given to the input element. Used to link the label to the input. */
    id?: string;
    /** A form validation error to display below the input. */
    error?: string | false;
    /** A boolean value to specify if component is disabled. */
    disabled?: boolean;
    /** The new string value is provided as a convenience for state updaters. */
    onChange?: (newValue: string, e: ChangeEvent<HTMLInputElement>) => any;
    /** Whether to show the search icon */
    isSearchInput?: boolean;
    /** Custom prefix icon to show before the input text */
    prefixIcon?: ReactNode;
    /** Text or element to display after the input */
    suffix?: ReactNode;
    /** Additional element to display below the helpText, useful for links or additional information */
    learnMore?: ReactNode;
}

/**
 * TextInput component for collecting user input with various states including default, hover, selected/active, destructive, and disabled.
 * Supports search functionality with an optional search icon.
 */
export default forwardRef(function TextInput(
    {
        id = nanoid(),
        width,
        label,
        className,
        helpText,
        error,
        onChange,
        disabled,
        isSearchInput,
        prefixIcon,
        suffix,
        learnMore,
        type = 'text',
        ...otherProps
    }: TextInputProps,
    ref: Ref<HTMLInputElement>,
) {
    return (
        <FormGroup
            id={id}
            className={className}
            style={{ width }}
            label={label}
            helpText={helpText}
            error={error}
            disabled={disabled}
            learnMore={learnMore}
        >
            <div className={styles.wrapper}>
                {prefixIcon && <div className={styles.prefixIcon}>{prefixIcon}</div>}
                <input
                    id={id}
                    ref={ref}
                    disabled={disabled}
                    type={type}
                    className={clsx(
                        styles.input,
                        prefixIcon && styles.withPrefixIcon,
                        error && styles.error,
                        className,
                    )}
                    {...otherProps}
                    onChange={(e) => onChange?.(e.target.value, e)}
                    onKeyUp={(e) => {
                        if (e.key === 'Escape') {
                            e.stopPropagation();
                            e.currentTarget.blur();
                        }
                    }}
                />
                {suffix && (
                    <Text className={styles.suffix} variant="body-md-med">
                        {suffix}
                    </Text>
                )}
            </div>
        </FormGroup>
    );
});
