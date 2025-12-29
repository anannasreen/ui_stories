import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import styles from './Divider.module.scss';

/**
 * Variants configuration for the Divider component
 */
export const variants = cva(styles.divider, {
    /** The orientation of the divider. */
    variants: {
        orientation: {
            horizontal: styles.horizontal,
            vertical: styles.vertical,
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
    },
});

export interface DividerProps extends VariantProps<typeof variants> {
    /**
     * Optional className for custom styling
     */
    className?: string;
}

/**
 * Divider component provides a visual separator between content sections.
 * Can be displayed horizontally or vertically.
 *
 * @example
 * ```tsx
 * // Horizontal divider (default)
 * <Divider />
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // With custom styling
 * <Divider className="custom-divider" />
 * ```
 */
export const Divider: React.FC<DividerProps> = ({ orientation, className }) => {
    return <div className={variants({ orientation, className })} role="separator" />;
};
