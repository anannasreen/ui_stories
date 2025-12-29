import React, { HTMLProps } from 'react';
import clsx from 'clsx';
import css from './Progress.module.scss';

interface Props extends Pick<HTMLProps<HTMLSpanElement>, 'style' | 'className'> {
    /** CSS value for the thickness of the ring. */
    borderSize?: string;
    /** CSS value for the color of the ring. */
    color?: string;
    /** CSS value for the length of the animation. */
    duration?: string;
    /** CSS value for the width & height of the indicator.
     * The default is meant to match the size of our copy & icons.
     */
    size?: string;
    /** CSS value for the margin around the ring. */
    space?: string;
    /** If true, the animation will not run. */
    paused?: boolean;
}

/**
 * `<Progress />` is used to indicate an ongoing process.
 * Currently, it only supports a circular, indeterminate form.

 * It defaults to the surrounding `color` value (`currentColor`).
 */
export default function Progress({
    color = 'currentColor',
    duration = '1s',
    size = '16px',
    space,
    borderSize = `calc(${size} / 8)`,
    className,
    style,
    paused,
    ...props
}: Props & Omit<HTMLProps<HTMLDivElement>, keyof Props>) {
    return (
        <div
            className={clsx(css.spinner, className, { [css.paused]: paused })}
            style={
                {
                    margin: space,
                    ...style,
                    '--border-size': borderSize,
                    '--color': color,
                    '--duration': duration,
                    '--size': size,
                } as React.CSSProperties
            }
            {...props}
        />
    );
}
