import React from 'react';
import { cva, cx, type VariantProps } from 'class-variance-authority';
import styles from './ActionGroup.module.scss';

/**
 * Variants configuration for the ActionGroup component
 */
const actionGroupVariants = cva(styles.actionGroup, {
    variants: {
        orientation: {
            horizontal: '',
            vertical: styles.vertical,
        },
    },
});

export interface ActionGroupProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof actionGroupVariants> {
    /** The buttons or other action elements to be grouped */
    children: React.ReactNode;
    /** Whether the group should be laid out vertically */
    orientation?: 'horizontal' | 'vertical';
}

/**
 * ActionGroup component provides consistent spacing and layout for a set of buttons or other action elements.
 * Used to align action buttons with consistent spacing and orientation.
 *
 * @example
 * ```tsx
 * // Horizontal group (default)
 * <ActionGroup>
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </ActionGroup>
 *
 * // Vertical group
 * <ActionGroup orientation="vertical">
 *   <Button>Edit</Button>
 *   <Button>Delete</Button>
 * </ActionGroup>
 *
 * // With custom className
 * <ActionGroup className="custom-actions">
 *   <Button>Approve</Button>
 *   <Button>Reject</Button>
 * </ActionGroup>
 * ```
 */
export default function ActionGroup({ children, orientation = 'horizontal', className, ...props }: ActionGroupProps) {
    return (
        <div className={cx(actionGroupVariants({ orientation }), className)} {...props}>
            {children}
        </div>
    );
}
