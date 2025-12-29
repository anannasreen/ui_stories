import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './Border.module.scss';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    /** Border thickness in pixels (number) or CSS value (string) */
    thickness?: number | string;
    /** Whether the border is visible */
    visible?: boolean;
    /** Content to be displayed as the border itself */
    borderContents: React.ReactNode;
}

/**
 * Border component creates a container with customizable borders.
 * Uses CSS variables to control border thickness and visibility.
 *
 * ```
 * <Border
 *   borderContents={<div className="border-element" />}
 *   thickness={2}
 *   visible={true}
 * >
 *   Content inside the border
 * </Border>
 * ```
 */
export default function Border({
    borderContents,
    thickness = 0,
    visible = true,
    className,
    style = {},
    children,
    ...etc
}: Props) {
    return (
        <div
            {...etc}
            className={clsx(styles.Border, className)}
            data-testid="border"
            style={
                {
                    '--visible': visible ? 1 : 0,
                    '--thickness': typeof thickness === 'number' ? `${thickness}px` : thickness,
                    ...style,
                } as CSSProperties
            }
        >
            {borderContents}
            {children}
        </div>
    );
}
