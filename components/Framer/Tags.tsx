import React from 'react';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import styles from './Tags.module.scss';

export type Props = React.HTMLProps<HTMLDivElement>;

/**
 * Tags component provides a container for floating tags with AnimatePresence.
 *
 * ```
 * <Tags>
 *   <Tag>Tag 1</Tag>
 *   <Tag>Tag 2</Tag>
 * </Tags>
 * ```
 */
export default function Tags({ children, className, ...etc }: Props) {
    return (
        <div className={clsx(styles.Tags, className)} {...etc}>
            <AnimatePresence>{children}</AnimatePresence>
        </div>
    );
}
