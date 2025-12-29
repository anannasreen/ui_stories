import React, { useState } from 'react';
import clsx from 'clsx';
import { PulseOnChange, SharedAnimatedAndStaticDivProps } from '../Transitions';
import styles from './CountBadge.module.scss';
import { Text } from '../Text';

/**
 * Props for the CountBadge component
 * @extends SharedAnimatedAndStaticDivProps
 */
interface Props extends SharedAnimatedAndStaticDivProps {
    /** The numeric value to display in the badge */
    count?: number;
    /** Optional icon element to display alongside the count */
    icon?: React.ReactNode;
    /** Controls the selected state of the badge */
    selected?: boolean;
    /** Callback fired when selection state changes */
    onSelectionChange?: (selected: boolean) => void;
}

/**
 * A flexible badge component that displays a count value with optional icon and selection state.
 */
export default function CountBadge({ count, icon, className, selected, onSelectionChange, ...etc }: Props) {
    return (
        <PulseOnChange
            compare={count}
            hidden={!count}
            className={clsx(styles.CountBadge, { [styles.selected]: selected }, className)}
            data-testid="count-badge"
            {...etc}
        >
            <div className={styles.wrapper}>
                <Text variant="body-xs-regular" className={styles.count}>
                    {count}
                </Text>
                {icon && <Text variant="body-xs-regular">{icon}</Text>}
            </div>
        </PulseOnChange>
    );
}
