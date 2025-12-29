import React, { CSSProperties } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

import styles from './Tag.module.scss';

export interface Props extends HTMLMotionProps<'div'> {
    /** Color of the tag */
    color: string;
    /** Width of the tag in pixels (number) or CSS value (string) */
    width: number | string;
    /** Whether this tag is the only child in its container. Affects animation behavior. */
    onlyChild?: boolean;
}

/**
 * Tag component displays animated content with customizable width and color.
 * Used within the Framer component to display frame content in animated tags.
 *
 * Features animated enter/exit transitions using framer-motion, with special
 * handling for single tags (onlyChild=true) to prevent unnecessary animations.
 *
 * ```
 * <Tag
 *   color="#ff0000"
 *   width={150}
 *   onlyChild={false}
 * >
 *   Content to display in the tag
 * </Tag>
 * ```
 */
export default function Tag({
    color,
    width,
    onlyChild = false,
    children,
    className,
    style = {},
    initial,
    animate,
    exit,
    ...etc
}: Props) {
    return (
        <motion.div
            className={clsx(styles.Tag, className)}
            style={{ '--color': color, '--progress': 1, ...style } as CSSProperties}
            initial={onlyChild ? false : ({ width: 0, '--progress': 0 } as any)}
            animate={{ width, '--progress': 1 } as any}
            exit={onlyChild ? undefined : ({ width: 0, '--progress': 0, transition: { duration: 0.2 } } as any)}
            {...etc}
        >
            <div className={styles.content}>{children}</div>
        </motion.div>
    );
}
