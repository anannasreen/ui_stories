import React from 'react';
import { cva } from 'class-variance-authority';
import styles from './EventStatus.module.scss';
import { Text } from '../Text';

/**
 * Type defining the possible event status variants
 */
export type EventStatusVariant = 'open' | 'onHold' | 'inProgress' | 'resolved';

/**
 * Configuration for status variants with their respective CSS classes and display text
 */
const statusConfig = {
    open: {
        className: styles.open,
        displayText: 'Open',
    },
    onHold: {
        className: styles.onHold,
        displayText: 'On-Hold',
    },
    inProgress: {
        className: styles.inProgress,
        displayText: 'In-Progress',
    },
    resolved: {
        className: styles.resolved,
        displayText: 'Resolved',
    },
} as const;

const statusVariants = cva('', {
    variants: {
        variant: {
            open: statusConfig.open.className,
            onHold: statusConfig.onHold.className,
            inProgress: statusConfig.inProgress.className,
            resolved: statusConfig.resolved.className,
        },
    },
    defaultVariants: {
        variant: 'open',
    },
});

export interface EventStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Status of the event */
    status: EventStatusVariant;
}

/**
 * EventStatus component displays the current status of an event with appropriate styling.
 *
 * @example
 * ```tsx
 * // Display an open event status
 * <EventStatus status="open" />
 *
 * // Display a resolved event status
 * <EventStatus status="resolved" />
 * ```
 */
export default function EventStatus({ status, ...props }: EventStatusProps) {
    return (
        <div {...props} className={styles.eventContainer}>
            <Text variant="body-sm-med" className={statusVariants({ variant: status })}>
                {statusConfig[status].displayText}
            </Text>
        </div>
    );
}
