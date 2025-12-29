import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from '../Text';
import styles from './Time.module.scss';
import { formatTime } from '@cobalt/ui/utils/format';

/**
 * Variants configuration for the Time component
 */
export const timeVariants = cva(styles.container, {
    variants: {
        variant: {
            dark: styles.dark,
            light: styles.light,
            muted: styles.muted,
        },
    },
    defaultVariants: {
        variant: 'dark',
    },
});

export interface TimeProps extends VariantProps<typeof timeVariants> {
    /** The time to display */
    timestamp: string | Date;
    /** Optional className to override styles */
    className?: string;
}

/**
 * Time component displays a formatted time with various visual styles.
 * Uses the formatTime utility to format timestamps consistently.
 *
 * @example
 * ```tsx
 * // Default dark style
 * <Time timestamp="2023-01-01T00:00:00" />
 *
 * // Light style for dark backgrounds
 * <Time timestamp="2023-01-01T00:00:00" variant="light" />
 *
 * // Muted style for less emphasis
 * <Time timestamp="2023-01-01T00:00:00" variant="muted" />
 * ```
 */
export default function Time({ timestamp, variant, className }: TimeProps) {
    return (
        <div data-testid="time-container" className={timeVariants({ variant, className })}>
            <div data-testid="time-wrapper" className={styles.wrapper}>
                <Text variant="body-sm-med" className={styles.content}>
                    {formatTime(timestamp, { hideTz: true })}
                </Text>
            </div>
        </div>
    );
}
