import React, { forwardRef } from 'react';
import { cva, cx, type VariantProps } from 'class-variance-authority';
import styles from './FilterButton.module.scss';
import { Text } from '../Text';

/**
 * FilterButton variants configuration using class-variance-authority
 * Defines all possible visual styles and states for the filter button
 */
export const filterButtonVariants = cva(styles.filterButton, {
    variants: {
        state: {
            active: styles.active,
            default: styles.defaultStyle,
        },
        isDisabled: {
            true: styles.disabled,
        },
    },
});

export interface FilterButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof filterButtonVariants> {
    /** Label text for the button */
    label: string;
    /** Whether the filter is currently active */
    isActive?: boolean;
    /** Optional icon to display in the button */
    icon?: React.ReactNode;
}

/**
 * FilterButton component displays a button with a label and optional icon.
 *
 * ```tsx
 * <FilterButton label="Filter" icon={<FilterIcon />} isActive={true} />
 * ```
 */
const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
    ({ label, isActive = false, icon, disabled, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={cx(
                    filterButtonVariants({
                        state: isActive ? 'active' : 'default',
                        isDisabled: disabled,
                    }),
                    className,
                )}
                disabled={disabled}
                {...props}
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <Text variant="body-md-regular">{label}</Text>
            </button>
        );
    },
);

export default FilterButton;
