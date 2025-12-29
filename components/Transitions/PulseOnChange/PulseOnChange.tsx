import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, HTMLMotionProps, useMotionValue } from 'framer-motion';
import clsx from 'clsx';

import styles from './PulseOnChange.module.scss';

interface UseScaleOnChangeConfig {
    durationMs?: number;
    scaleTo?: number;
}

function useScaleOnChange<T>(value?: T, { durationMs = 225, scaleTo = 1.1 }: UseScaleOnChangeConfig = {}) {
    const scale = useMotionValue(1);
    const history = useRef<T | undefined>(value);
    const prevValue = history.current;

    useEffect(() => {
        history.current = value;
    }, [value]);

    useEffect(() => {
        if (!value || !prevValue) return;
        if (value === prevValue) return;

        scale.set(scaleTo);

        const timeout = setTimeout(() => {
            scale.set(1);
        }, durationMs / 2);

        return () => clearTimeout(timeout);
    }, [scale, value, prevValue, scaleTo, durationMs]);

    return scale;
}

export interface Props extends Omit<HTMLMotionProps<'div'>, 'value' | 'children'> {
    /** The value/rendered value to animate in and out */
    children?: React.ReactNode;
    /** The duration in milliseconds that the fade animation should run */
    durationMs?: number;
    /** The value to use to check if anything has changed. Defaults to children. */
    compare?: any;
    /** Don't display the value. Prefer this to `foo && <PulseOnChange>...</PulseOnChange>` */
    hidden?: boolean;
}

/**
 * An animated pulse transition for value changes.
 */
export default function PulseOnChange({
    children,
    compare = children,
    durationMs = 225,
    hidden = false,
    className,
    style = {},
    ...etc
}: Props) {
    const scale = useScaleOnChange(compare, { durationMs });

    return (
        <AnimatePresence initial={false}>
            {!hidden && (
                <motion.div
                    className={clsx(styles.PulseOnChange, className)}
                    initial={{ width: 0, height: 0 }}
                    animate={{ width: 'auto', height: 'auto' }}
                    exit={{ width: 0, height: 0, margin: 0, transition: { duration: 0.25, ease: 'backIn' } }}
                    style={{ ...style, scale }}
                    {...etc}
                >
                    {children || null}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
