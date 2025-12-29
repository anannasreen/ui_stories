import React, { useMemo, useState, useEffect, useCallback, CSSProperties } from 'react';
import clsx from 'clsx';
import { useDeepValueEqualityMemo } from '../../hooks';

import styles from './Stripes.module.scss';

export interface Props extends Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'key'> {
    /** Array of colors to use in the striped gradient */
    colors: string[];
    /** Width of each stripe in pixels (number) or CSS value (string) */
    width?: string | number;
    /** Angle of the stripes in degrees */
    angle?: number;
    /** Whether the stripes are visible */
    visible?: boolean;
}

/**
 * Stripes component creates animated striped backgrounds using CSS gradients.
 * Smoothly transitions between different gradient definitions when props change.
 *
 * The component handles transitioning between different stripe configurations by
 * rendering two divs and fading between them, since CSS cannot directly transition
 * between gradient definitions.
 *
 * ```
 * <Stripes
 *   colors={['#ff0000', '#00ff00', '#0000ff']}
 *   width={15}
 *   angle={-45}
 *   visible={true}
 * />
 * ```
 */
export default function Stripes({
    colors,
    width = 20,
    angle = -45,
    visible = true,
    className,
    style = {},
    ...etc
}: Props) {
    const stableColors = useDeepValueEqualityMemo(() => colors, [colors]);

    const gradientDefinition = useMemo(() => {
        if (!stableColors.length) return '';

        const cssWidth = typeof width === 'number' ? `${width}px` : width;
        const widthTimes = (n: number) => `calc(${cssWidth} * ${n})`;

        const stops = stableColors.map((color, i) => `${color} ${widthTimes(i)} ${widthTimes(i + 1)}`).join(', ');
        return `repeating-linear-gradient(${angle}deg, ${stops})`;
    }, [stableColors, width, angle]);

    const [currentlyDisplayedGradient, setCurrentlyDisplayedGradient] = useState(gradientDefinition);

    const [transitioning, setTransitioning] = useState(false); // since we can't transition between gradients in css

    useEffect(() => {
        if (gradientDefinition === currentlyDisplayedGradient) return;

        setTransitioning(true);
    }, [gradientDefinition, currentlyDisplayedGradient]);

    const onStripeTransitionEnd = useCallback(() => {
        if (currentlyDisplayedGradient !== gradientDefinition) {
            setCurrentlyDisplayedGradient(gradientDefinition);
        }
        setTransitioning(false);
    }, [gradientDefinition, currentlyDisplayedGradient]);

    return (
        <>
            <div
                className={clsx(styles.Stripes, { [styles.visible]: visible }, className)}
                style={{ ...style, '--bg-image': currentlyDisplayedGradient } as CSSProperties}
                key="current"
                data-testid="stripe"
                {...etc}
            />
            <div
                className={clsx(styles.Stripes, { [styles.visible]: visible && transitioning }, className)}
                style={{ ...style, '--bg-image': gradientDefinition } as CSSProperties}
                onTransitionEnd={onStripeTransitionEnd}
                key="next"
                data-testid="stripe"
                {...etc}
            />
        </>
    );
}
