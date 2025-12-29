/**
 * MultiToggleGroup is a container component that manages a group of toggle buttons.
 * It provides functionality for single or multiple selection, different orientations,
 * and various size variants.
 *
 * @example
 * ```tsx
 * <MultiToggleGroup
 *   selectionMode="single"
 *   orientation="horizontal"
 *   size="medium"
 *   onSelectionChange={(keys) => console.log('Selected:', keys)}
 * >
 *   <MultiToggleOption id="option1" icon={<Icon1 />} />
 *   <MultiToggleOption id="option2" icon={<Icon2 />} />
 * </MultiToggleGroup>
 * ```
 */
import React from 'react';
import { ToggleButtonGroup, Key } from 'react-aria-components';
import { clsx } from 'clsx';
import styles from './Group.module.scss';

/**
 * Orientation of the toggle group.
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Size variant of the buttons.
 */
export type ToggleVariant = 'small' | 'medium' | 'large';

/**
 * Selection mode of the toggle group.
 */
export type SelectionMode = 'single' | 'multiple';

/**
 * Props for the MultiToggleGroup component.
 */
export interface Group extends React.HTMLAttributes<HTMLDivElement> {
    /** styles for the element */
    className?: string;
    /** set the disabled state for all group options */
    isDisabled?: boolean;
    /** toggle group choices */
    children?: React.ReactNode;
    /** orientation of the toggle group */
    orientation?: Orientation;
    /** whether the group should take up full width */
    fullWidth?: boolean;
    /** size variant of the buttons */
    size?: ToggleVariant;
    /** callback when selection changes */
    onSelectionChange?: (keys: Set<Key>) => void;
    /** current selected keys */
    selectedKeys?: Set<Key>;
    /** default selected keys */
    defaultSelectedKeys?: Set<Key>;
    /** selection mode */
    selectionMode?: SelectionMode;
}

/**
 * MultiToggleGroup component.
 *
 * @param props - Props for the component.
 * @returns The MultiToggleGroup component.
 */
export default function Group({
    className,
    isDisabled,
    children,
    orientation = 'horizontal',
    fullWidth,
    size = 'small',
    onSelectionChange,
    selectedKeys,
    defaultSelectedKeys,
    selectionMode = 'single',
    ...restProps
}: Group) {
    return (
        <ToggleButtonGroup
            className={clsx(
                styles.multiToggleGroup,
                orientation ? styles[orientation as keyof typeof styles] : null,
                size ? styles[size as keyof typeof styles] : null,
                className,
            )}
            orientation={orientation}
            isDisabled={isDisabled}
            selectedKeys={selectedKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            onSelectionChange={onSelectionChange}
            selectionMode={selectionMode}
            {...restProps}
        >
            {children}
        </ToggleButtonGroup>
    );
}
