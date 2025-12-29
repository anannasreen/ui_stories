import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';

/**
 * SortIcon component displays an icon indicating the sorting direction.
 *
 * ```tsx
 * <SortIcon direction="asc" />
 * ```
 */
export default function SortIcon({ direction, className }: { direction: 'asc' | 'desc' | false; className?: string }) {
    const size = '1em';
    return direction && direction === 'asc' ? (
        <FaCaretUp data-testid="caret-up" className={className} size={size} />
    ) : (
        <FaCaretDown data-testid="caret-down" className={className} size={size} />
    );
}
