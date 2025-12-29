import React, { useLayoutEffect, useState, cloneElement, isValidElement, useEffect, useRef, useCallback } from 'react';
import { motion, HTMLMotionProps, useAnimation } from 'framer-motion';

import { useLastValue } from '../../../hooks';

export interface Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
    /** The value/rendered value to animate in and out */
    children?: React.ReactNode;
    /** The duration in milliseconds that the fade animation should run */
    durationMs?: number;
    /** The value to use to check if anything has changed. Defaults to children. */
    compare?: any;
}

/**
 * An animated fade transition for value changes.
 */
export default function FadeOnChange({ children, compare = children, durationMs = 300, className, ...etc }: Props) {
    const controls = useAnimation();
    const [isAnimating, setIsAnimating] = useState(false);
    const prevCompare = useLastValue(compare);

    const [snapshot, setSnapshot] = useState(children);
    const childrenRef = useRef(children);

    useEffect(() => {
        childrenRef.current = children;
    }, [children]);

    const snapshotChildren = useCallback(() => {
        setSnapshot(isValidElement(childrenRef.current) ? cloneElement(childrenRef.current) : childrenRef.current);
    }, []);

    useLayoutEffect(() => {
        if (prevCompare == null || compare == null || compare === prevCompare) return;

        snapshotChildren();

        const animateChange = async () => {
            setIsAnimating(true);
            await controls.start({ opacity: 0, transition: { duration: durationMs / 1000 / 2 } });

            snapshotChildren();

            await controls.start({ opacity: 1, transition: { duration: durationMs / 1000 / 2 } });
            setIsAnimating(false);
        };

        animateChange();
    }, [compare, prevCompare, controls, durationMs, snapshotChildren]);

    return (
        <motion.div animate={controls} className={className} {...etc}>
            {isAnimating ? snapshot : children}
        </motion.div>
    );
}
