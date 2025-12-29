import React, { ChangeEvent, HTMLProps, ReactNode, useEffect, useRef, forwardRef } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import { mergeRefs } from 'react-merge-refs';
import styles from './Checkbox.module.scss';
import { Text } from '@cobalt/ui/components/Text';

interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'value' | 'children' | 'label'> {
    /** An ID to be given to the input element. Used to link the label to the input. */
    id?: string;
    /** A label for the checkbox. You can specify the position of the label using the `alignLabel` prop */
    label?: ReactNode;
    /** Specify position of label, relative to the checkbox. Defaults to 'right'.
     *
     * The label should always be aligned on the inside. So when the input is left-aligned,
     * `alignLabel` should be "right", and vice versa.
     */
    alignLabel?: 'left' | 'right';
    /** Whether the checkbox should appear in an indeterminate state */
    indeterminate?: boolean;
    /** The checked state of the checkbox */
    value?: boolean;
    /** Whether the checkbox should be rendered in a destructive state */
    destructive?: boolean;
    /** Callback function when the checkbox value changes */
    onChange?: (newValue: boolean, e: ChangeEvent<HTMLInputElement>) => any;
}

/**
 * Checkbox component provides a styled checkbox input with customizable label positioning.
 * Supports standard checkbox features including checked, unchecked, and indeterminate states.
 *
 * ```
 * <Checkbox
 *   label="Accept terms and conditions"
 *   value={isChecked}
 *   onChange={setIsChecked}
 * />
 * ```
 */
export default forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    {
        id = nanoid(),
        label,
        alignLabel = 'right',
        value,
        onChange,
        disabled,
        indeterminate = false,
        destructive = false,
        className,
        style,
        ...etc
    }: CheckboxProps,
    forwardedRef,
) {
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        // since no browser supports indeterminate as a prop we need to set via the js api
        if (!ref?.current) return;
        ref.current.indeterminate = indeterminate;
    }, [indeterminate, ref]);

    return (
        <label
            htmlFor={id}
            className={clsx(styles.checkbox, { [styles.destructive]: destructive }, className)}
            style={style}
            data-testid="checkbox-label"
        >
            {alignLabel === 'left' && (
                <Text variant="body-md-med" className={styles.label} data-testid="checkbox-text">
                    {label}
                </Text>
            )}
            <input
                id={id}
                type="checkbox"
                checked={value}
                onChange={(e) => onChange?.(e.target.checked, e)}
                disabled={disabled}
                {...etc}
                ref={mergeRefs([ref, forwardedRef])}
                data-testid="checkbox-input"
            />
            {alignLabel === 'right' && (
                <Text variant="body-md-med" className={styles.label} data-testid="checkbox-text">
                    {label}
                </Text>
            )}
        </label>
    );
});
