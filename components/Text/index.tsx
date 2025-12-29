import React from 'react';
import { cva, cx, VariantProps } from 'class-variance-authority';
import styles from './Text.module.scss';

export const variants = cva(styles.text, {
    variants: {
        variant: {
            'heading-display': styles.headingDisplay,
            'heading-title': styles.headingTitle,
            'heading-h1': styles.headingH1,
            'heading-h2': styles.headingH2,
            'heading-h3': styles.headingH3,
            'heading-h4': styles.headingH4,
            'heading-h5': styles.headingH5,
            'heading-h6': styles.headingH6,
            'body-xxl-regular': styles.bodyXxlRegular,
            'body-xxl-med': styles.bodyXxlMed,
            'body-xxl-bold': styles.bodyXxlBold,
            'body-xl-regular': styles.bodyXlRegular,
            'body-xl-med': styles.bodyXlMed,
            'body-xl-bold': styles.bodyXlBold,
            'body-lg-regular': styles.bodyLgRegular,
            'body-lg-med': styles.bodyLgMed,
            'body-lg-bold': styles.bodyLgBold,
            'body-md-regular': styles.bodyMdRegular,
            'body-md-med': styles.bodyMdMed,
            'body-md-bold': styles.bodyMdBold,
            'body-sm-regular': styles.bodySmRegular,
            'body-sm-med': styles.bodySmMed,
            'body-sm-bold': styles.bodySmBold,
            'body-sm-md-upper-case': styles.bodySmMdUpperCase,
            'body-xs-regular': styles.bodyXsRegular,
        },
    },
    defaultVariants: {
        variant: 'body-lg-regular',
    },
});

export interface TextProps extends VariantProps<typeof variants> {
    /** The element type to render */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
    /** The text style variant to apply */
    className?: string;
    /** Additional inline styles */
    style?: React.CSSProperties;
    /** The content to display */
    children: React.ReactNode;
    /** For attribute for label elements */
    htmlFor?: string;
    /** Additional HTML attributes */
    [key: string]: any;
}

/**
 * Text component provides a styled text element with consistent styling.
 *
 * ```
 * <Text variant="body-lg-regular">Text</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
    as: Tag = 'div',
    children,
    className,
    style,
    variant,
    htmlFor,
    ...rest
}) => {
    return (
        <Tag
            className={cx(variants({ variant }), className)}
            style={style}
            {...rest}
            {...(Tag === 'label' && htmlFor ? { htmlFor } : {})}
        >
            {children}
        </Tag>
    );
};
