import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Size of the dots */
    dotSize?: string;
    /** Duration of the animation */
    duration?: string;
    /** Height of the loading subtle */
    height?: string;
}

/**
 * LoadingSubtle component provides a subtle loading animation.
 *
 * ```
 * <LoadingSubtle />
 * ```
 */
export default function LoadingSubtle({
    dotSize = '0.125em',
    duration = '0.6s',
    height,
    style = {},
    className,
    ...etc
}: Props) {
    return (
        <div
            className={clsx(className, styles.LoadingSubtle)}
            style={
                {
                    '--dot-size': dotSize,
                    '--duration': duration,
                    '--height': height,
                    ...style,
                } as React.CSSProperties
            }
            data-testid="loading-subtle"
            {...etc}
        >
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
        </div>
    );
}
