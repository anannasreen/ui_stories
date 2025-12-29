import React from 'react';
import clsx from 'clsx';
import css from './PillsList.module.scss';
import { Text } from '../../Text';
import CloseButton from '../../assets/close-button.svg';

export interface PillItem {
    id: string;
    label: string;
}

export interface PillsListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
    /**
     * Array of items to display as pills
     */
    items?: PillItem[];

    /**
     * Callback when a pill is deleted
     */
    onDelete?: (item: PillItem, index: number) => void;
    /**
     * Whether the pills are disabled
     */
    disabled?: boolean;
    /**
     * Whether the pills are read-only (no delete button)
     */
    readOnly?: boolean;
    /**
     * Whether to show the pills in a destructive state
     */
    destructive?: boolean;
    /**
     * Size of the pills - 'medium' or 'small'
     */
    size?: 'medium' | 'small';
}

/**
 * PillsList component provides a list of pills that can be deleted.
 *
 * ```
 * <PillsList
 *   items={[
 *     { id: '1', label: 'Red' },
 *     { id: '2', label: 'Green' },
 *     { id: '3', label: 'Blue' },
 *   ]}
 *   onDelete={(item, index) => console.log(`Deleting pill ${item.label} at index ${index}`)}
 * />
 * ```
 */
export const PillsList = ({
    items = [],
    onDelete = () => {},
    className,
    disabled = false,
    readOnly = false,
    destructive = false,
    size = 'medium',
    ...props
}: PillsListProps) => {
    const handleDelete = React.useCallback(
        (item: PillItem, index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (!disabled) {
                onDelete(item, index);
            }
        },
        [disabled, onDelete],
    );

    return (
        <ul className={clsx(css.list, className)} role="list" aria-label="List of pills" {...props}>
            {items.map((item, index) => (
                <li key={item.id} role="listitem">
                    <div
                        className={clsx(
                            css.pill,
                            disabled && css.disabled,
                            destructive && css.destructive,
                            size === 'small' && css.small,
                        )}
                        title={`Remove ${item.label}`}
                    >
                        <Text variant="body-xs-regular" className={css.pillText}>
                            {item.label}
                        </Text>
                        {!readOnly && (
                            <button
                                type="button"
                                onClick={handleDelete(item, index)}
                                className={css.closeButton}
                                disabled={disabled}
                                aria-label={`Remove ${item.label}`}
                            >
                                <CloseButton className={css.closeIcon} />
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};
