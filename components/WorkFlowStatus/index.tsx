import React from 'react';
import styles from './WorkFlowStatus.module.scss';
import { Text } from '../Text';
import CheckedIcon from '../assets/checked-icon.svg';
import CheckingIcon from '../assets/checking-icon.svg';
import UncheckedIcon from '../assets/unchecked-icon.svg';

/**
 * Type defining the possible workflow status variants
 */
export type WorkFlowStatusVariant = 'included' | 'checking' | 'unchecked';

/**
 * Configuration for workflow variants with their respective icons
 */
const statusConfig = {
    included: {
        icon: <CheckedIcon />,
    },
    checking: {
        icon: <CheckingIcon />,
    },
    unchecked: {
        icon: <UncheckedIcon />,
    },
} as const;

export interface WorkFlowStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Variant of the workflow */
    variant: WorkFlowStatusVariant;
    /** Description of the workflow */
    description: string;
    /** Status of the workflow */
    status: string;
}

/**
 * WorkFlowStatus component displays a workflow status with an icon and text.
 * Used to show the status of different workflow steps with appropriate icons.
 *
 * @example
 * ```tsx
 * <WorkFlowStatus variant="included" description="Workflow" status="Completed" />
 *
 * <WorkFlowStatus variant="checking" description="Process" status="In Progress" />
 *
 * <WorkFlowStatus variant="unchecked" description="Verification" status="Pending" />
 * ```
 */
export default function WorkFlowStatus({ variant, description, status, ...props }: WorkFlowStatusProps) {
    return (
        <div {...props} className={styles.workflowContainer}>
            <div className={styles.iconWrapper}>{statusConfig[variant].icon}</div>
            <div className={styles.textWrapper}>
                <Text variant="body-sm-med" className={styles.description}>
                    {description}:
                </Text>
                <Text variant="body-sm-med" className={styles.status}>
                    {status}
                </Text>
            </div>
        </div>
    );
}
