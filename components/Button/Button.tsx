import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, cx, VariantProps } from 'class-variance-authority';
import { Link, LinkProps } from 'react-aria-components';
import styles from './Button.module.scss';
import TitleTooltip from '../TitleTooltip';

/**
 * Button variants configuration using class-variance-authority
 * Defines all possible visual styles, sizes for the button, and separates color from variant
 */
export const buttonVariants = cva(styles.button, {
    variants: {
        color: {
            primary: styles.primary,
            secondary: styles.secondary,
            destructive: styles.destructive,
            success: styles.success,
        },
        variant: {
            default: styles.default,
            outline: styles.outline,
            ghost: styles.ghost,
        },
        /** Size of the button */
        size: {
            medium: styles.medium,
            small: styles.small,
            xs: styles.xs,
        },
        /** Whether the button should take up the full width of its container */
        fullscreen: {
            true: styles.fullscreen,
        },
    },
    defaultVariants: {
        color: 'primary',
        variant: 'default',
        size: 'medium',
        fullscreen: false,
    },
});

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'href' | 'color'>,
        VariantProps<typeof buttonVariants> {
    /** Optional icon to display in the button */
    icon?: React.ReactNode;
    /** Position of the icon relative to button text. Defaults to 'start' */
    iconPosition?: 'start' | 'end';
    /** Button content */
    children?: React.ReactNode;
    /** Whether to show only the icon without text */
    iconOnly?: boolean;
    /** Whether the button should have rounded corners (useful for icon buttons) */
    rounded?: boolean;
    /** URL to navigate to when the button is clicked. Renders as a Link instead of a button */
    href?: string;
    /** Target attribute for the link when href is provided */
    target?: string;
    /** Rel attribute for the link when href is provided */
    rel?: string;
    /** Title text to display in a tooltip when hovering over the button */
    title?: string;
    /** Download attribute for the link when href is provided */
    download?: string;
    /** Whether the button should take up the full width of its container */
    fullscreen?: boolean;
}

/**
 * A versatile Button component that supports various visual styles, sizes, and icon placements.
 * Can be rendered as a button or a link based on whether the href prop is provided.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            color = 'primary',
            variant = 'default',
            size,
            icon,
            iconPosition = 'start',
            iconOnly = false,
            disabled,
            children,
            href,
            target,
            rel,
            title,
            fullscreen,
            ...props
        },
        ref,
    ) => {
        const buttonClasses = cx(buttonVariants({ color, variant, size, fullscreen }), className);
        const content = (
            <>
                {icon && iconPosition === 'start' && <span className={styles.icon}>{icon}</span>}
                {!iconOnly && children && <span>{children}</span>}
                {icon && iconPosition === 'end' && <span className={styles.icon}>{icon}</span>}
            </>
        );

        // If href is provided, render as a Link
        if (href) {
            return (
                <TitleTooltip title={title}>
                    <Link
                        href={disabled ? undefined : href}
                        target={target}
                        rel={rel}
                        className={buttonClasses}
                        data-icon-only={iconOnly}
                        aria-disabled={disabled ? 'true' : undefined}
                        {...(props as LinkProps)}
                    >
                        {content}
                    </Link>
                </TitleTooltip>
            );
        }

        // Otherwise render as a button
        return (
            <TitleTooltip title={title}>
                <button className={buttonClasses} ref={ref} disabled={disabled} data-icon-only={iconOnly} {...props}>
                    {content}
                </button>
            </TitleTooltip>
        );
    },
);

export default Button;
