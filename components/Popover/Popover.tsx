import React, { DOMAttributes, ReactElement, ReactNode } from 'react';
import { Popover as AriaPopover, Dialog, DialogTrigger, Button as AriaButton, Pressable } from 'react-aria-components';
import clsx from 'clsx';
import styles from './Popover.module.scss';
import Button from '../Button';
import { MdClose } from 'react-icons/md';
import { Text } from '../Text';

interface PopoverProps {
    /** The trigger element that will open the popover when clicked */
    children: ReactElement<DOMAttributes<Element | HTMLOrSVGElement>, string>;
    /** Content to be displayed inside the popover */
    content?: ReactNode;
    /** Function that will be called when the popover opens or closes */
    onOpenChange?: (isOpen: boolean) => void;
    /** Optional title for the popover */
    title?: ReactNode;
    /** Optional CSS class for the popover container */
    className?: string;
    /** Optional CSS class for the popover content */
    contentClassName?: string;
    /** Optional placement of the popover relative to the trigger */
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end';
    /** Optional offset of the popover from the trigger */
    offset?: number;
    /** Optional styles to apply to the popover */
    style?: {
        content?: React.CSSProperties;
    };
    /** Optional width for the popover */
    width?: number | string;
    /** Optional default open state */
    defaultOpen?: boolean;
}

/**
 * A Popover component that appears when a trigger element is clicked.
 * Uses React Aria's Popover component for accessibility.
 */
export default function Popover({
    children,
    content,
    onOpenChange,
    title,
    className,
    contentClassName,
    placement = 'bottom',
    offset = 8,
    style,
    width,
    defaultOpen,
    ...props
}: PopoverProps) {
    const contentStyle = {
        ...(width ? { width } : {}),
        ...style?.content,
    };

    return (
        <DialogTrigger onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            <Pressable>{children}</Pressable>
            <AriaPopover
                placement={placement}
                offset={offset}
                className={clsx(styles.popover, className)}
                data-testid="aria-popover"
                data-offset={offset}
                {...props}
            >
                <Dialog
                    className={clsx(styles.dialog, contentClassName)}
                    style={contentStyle}
                    data-testid="aria-dialog"
                >
                    {({ close }) => (
                        <>
                            {title && (
                                <div className={styles.header} data-testid="popover-header">
                                    <Text variant="body-md-med">{title}</Text>
                                    <Button
                                        variant="ghost"
                                        icon={<MdClose />}
                                        onClick={close}
                                        aria-label="Close"
                                        data-testid="popover-close-button"
                                    />
                                </div>
                            )}
                            <div className={styles.content} data-testid="popover-content-wrapper">
                                {content}
                            </div>
                        </>
                    )}
                </Dialog>
            </AriaPopover>
        </DialogTrigger>
    );
}
