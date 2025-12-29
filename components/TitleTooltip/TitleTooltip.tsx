import React, { DOMAttributes, ReactElement } from 'react';
import { Tooltip, TooltipTrigger, OverlayArrow, Pressable } from 'react-aria-components';
import styles from './TitleTooltip.module.scss';
import { Text } from '../Text';
import CaretDown from '../assets/caret-down.svg';

export interface TitleTooltipProps {
    /** The title text to display in the tooltip */
    title?: string;
    /** The element to wrap with the tooltip */
    children: ReactElement<DOMAttributes<Element>, string>;
    /** Optional className for the tooltip */
    className?: string;
    /** Delay before showing the tooltip in milliseconds */
    delay?: number;
    /** Optional offset from the trigger element */
    offset?: number;
    /** Whether the tooltip is disabled */
    disabled?: boolean;
    /** Placement of the tooltip relative to the trigger element */
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end';
}

/**
 * A component that wraps children with a tooltip that displays the title text.
 * This is especially useful for Button components that need tooltips.
 */
export function TitleTooltip({
    title,
    children,
    className,
    delay = 300,
    offset = 8,
    disabled = false,
    placement = 'top',
}: TitleTooltipProps) {
    // If no title or disabled, just render children
    if (!title || disabled) {
        return <>{children}</>;
    }

    return (
        <TooltipTrigger delay={delay}>
            <Pressable>{children}</Pressable>
            <Tooltip offset={offset} placement={placement} className={`${styles.toolTip} ${className || ''}`}>
                <OverlayArrow className={styles.overlayArrow}>
                    <CaretDown />
                </OverlayArrow>
                <Text variant="body-sm-regular">{title}</Text>
            </Tooltip>
        </TooltipTrigger>
    );
}

export default TitleTooltip;
