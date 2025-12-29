import React, { useCallback } from 'react';
import clsx from 'clsx';
import CountBadge from '@cobalt/ui/components/CountBadge';
import styles from './FilterTabs.module.scss';

export interface FilterTabItem {
    /**
     * The value of the tab item
     */
    value: string;
    /**
     * The label of the tab item
     */
    label: string;
    /**
     * Whether the tab item is disabled
     */
    disabled?: boolean;
    /**
     * The count to display on the tab item
     */
    count?: number;
}

export interface FilterTabsProps {
    /**
     * The currently selected tab value
     */
    value: string;
    /**
     * Array of tab items
     */
    items: FilterTabItem[];
    /**
     * Callback when a tab is selected
     */
    onChange: (value: string) => void;
    /**
     * Optional className for styling
     */
    className?: string;
    /**
     * Whether all tabs are disabled
     */
    disabled?: boolean;
}

/**
 * FilterTabs component for switching between different views or sections
 */
export default function FilterTabs({ value, items, onChange, className, disabled: allDisabled }: FilterTabsProps) {
    const handleTabSelect = useCallback(
        (itemValue: string, isDisabled: boolean) => {
            if (!isDisabled) {
                onChange(itemValue);
            }
        },
        [onChange],
    );

    return (
        <div className={clsx(styles.container, className)} role="tablist">
            {items.map((item) => {
                const isSelected = item.value === value;
                const isDisabled = allDisabled || item.disabled || false;

                return (
                    <button
                        key={item.value}
                        className={clsx(styles.tab, {
                            [styles.selected]: isSelected,
                            [styles.disabled]: isDisabled,
                        })}
                        onClick={() => handleTabSelect(item.value, isDisabled)}
                        disabled={isDisabled}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-disabled={isDisabled}
                        tabIndex={isDisabled ? -1 : 0}
                    >
                        {item.label}
                        {item.count !== undefined && (
                            <CountBadge
                                count={item.count}
                                selected={isSelected}
                                onSelectionChange={(selected) => {
                                    if (!isDisabled && !!selected) {
                                        handleTabSelect(item.value, isDisabled);
                                    }
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
