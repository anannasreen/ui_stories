import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from '../Text';
import styles from './EventInfo.module.scss';

/**
 * Details variants configuration using class-variance-authority
 * Defines all possible visual styles and sizes for the details
 */
export const detailsVariants = cva(styles.container, {
    /** severity for the details */
    variants: {
        severity: {
            normal: styles.normal,
            critical: styles.critical,
            high: styles.high,
        },
        variant: {
            title: styles.title,
            body: styles.body,
        },
        muted: {
            true: styles.muted,
        },
    },
    defaultVariants: {
        severity: 'normal',
        variant: 'body',
        muted: false,
    },
});

/**
 * Text variants configuration for different content styles
 */
export const textVariants = cva('', {
    /** variants for the text */
    variants: {
        variant: {
            title: 'body-md-med',
            body: 'body-sm-med',
        },
    },
    defaultVariants: {
        variant: 'body',
    },
});

interface DetailsProps extends VariantProps<typeof detailsVariants> {
    /** text for the event info */
    text: React.ReactNode;
    /** icon for the event info */
    icon?: React.ReactNode;
    /** position of the icon */
    iconPosition?: 'left' | 'right';
}

/**
 * EventInfo component displays a piece of information with optional icon and severity.
 * Provides visual differentiation based on severity levels and layout options.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EventInfo text="Event description" />
 *
 * // With icon and high severity
 * <EventInfo
 *   text="Critical event detected"
 *   icon={<AlertIcon />}
 *   severity="high"
 * />
 *
 * // Title variant with left-positioned icon
 * <EventInfo
 *   text="Door Access"
 *   variant="title"
 *   icon={<DoorIcon />}
 *   iconPosition="left"
 * />
 * ```
 */
export default function EventInfo({ severity, variant, muted, text, icon, iconPosition = 'right' }: DetailsProps) {
    const renderIcon = () => icon && <div className={styles.iconWrapper}>{icon}</div>;

    // Map variant types to Text component variant props
    const getTextVariant = () => {
        if (variant === 'title') return 'body-md-med';
        return 'body-sm-med';
    };

    return (
        <div data-testid="event-info-container" className={detailsVariants({ severity, variant, muted })}>
            <div data-testid="event-info-wrapper" className={styles.wrapper}>
                {icon && iconPosition === 'left' && renderIcon()}
                <Text variant={getTextVariant()} className={styles.content}>
                    {text}
                </Text>
                {icon && iconPosition === 'right' && renderIcon()}
            </div>
        </div>
    );
}
