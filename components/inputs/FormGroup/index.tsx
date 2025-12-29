import React, { ReactNode, forwardRef, Ref, useRef, Children, cloneElement, isValidElement, ReactElement } from 'react';
import clsx from 'clsx';
import { Text } from '../../Text';
import styles from './FormGroup.module.scss';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The ID of the focusable input this FormGroup wraps. */
    id: string;
    /** Help text to be displayed below the input. */
    helpText?: ReactNode;
    /** Learn more text to be displayed above the input. */
    learnMore?: ReactNode;
    /** A label to be displayed above the input. */
    label?: ReactNode;
    /** Right-aligned inline helper string or component e.g. unit of measurement or icon */
    suffix?: ReactNode;
    /** Whether the input is disabled. */
    disabled?: boolean;
    /** The child component to be displayed inside the FormGroup. */
    children: ReactNode;
    /** A validation error to be displayed below the input. */
    error?: ReactNode | false;
    /** Whether to focus the input when clicking the container */
    focusOnClick?: boolean;
}

/**
 * FormGroup component provides a container for form elements with optional labels, help text, and validation.
 *
 * ```
 * <FormGroup
 *   id="username"
 *   label="Username"
 *   helpText="Enter your username"
 *   error="Username is required"
 * >
 *   <input type="text" id="username" name="username" />
 * </FormGroup>
 * ```
 */
export default forwardRef(function FormGroup(
    {
        children,
        label,
        learnMore,
        disabled,
        helpText,
        error,
        className,
        suffix,
        id,
        focusOnClick = false,
        ...etc
    }: FormGroupProps,
    ref: Ref<HTMLDivElement>,
) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const childrenWithRef = Children.map(children, (child) => {
        if (isValidElement(child) && focusOnClick) {
            return cloneElement(child as ReactElement<any>, {
                ref: (node: HTMLInputElement | HTMLTextAreaElement | null) => {
                    inputRef.current = node;
                    const childRef = (child as any).ref;

                    if (typeof childRef === 'function') {
                        childRef(node);
                    } else if (childRef && 'current' in childRef) {
                        childRef.current = node;
                    }
                },
            });
        }

        return child;
    });

    const handleContainerClick = (e: React.MouseEvent) => {
        if (focusOnClick && inputRef.current && e.target !== inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            {...etc}
            className={clsx(styles.formGroup, className, error && styles.hasError, disabled && styles.disabled)}
            ref={ref}
            onClick={handleContainerClick}
        >
            {(label || learnMore) && (
                <div className={styles.labelRow}>
                    {label && (
                        <Text
                            as="label"
                            variant="body-sm-med"
                            htmlFor={id}
                            className={clsx(styles.label, error && styles.error)}
                        >
                            {label}
                        </Text>
                    )}
                    {learnMore}
                </div>
            )}

            {childrenWithRef}

            {suffix && (
                <Text
                    variant="body-sm-med"
                    className={clsx(styles.suffix, typeof suffix === 'string' ? null : styles.suffixIcon)}
                >
                    {suffix}
                </Text>
            )}
            {error && (
                <Text variant="body-sm-med" className={styles.error}>
                    {error}
                </Text>
            )}
            {helpText && (
                <Text variant="body-sm-med" className={styles.helpText}>
                    {helpText}
                </Text>
            )}
        </div>
    );
});
