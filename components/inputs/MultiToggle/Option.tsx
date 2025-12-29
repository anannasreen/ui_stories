import React, { ReactElement } from 'react';
import { ToggleButton } from 'react-aria-components';
import styles from './Option.module.scss';
import { buttonVariants } from '../../Button/Button';

export interface OptionProps {
    /** Unique identifier for the option */
    id: string;
    /** Icon to display in the button */
    icon: ReactElement;
    /** Whether the option is disabled */
    isDisabled?: boolean;
    /** Click handler */
    onClick?: () => void;
}

/**
 * Option component provides a toggle button for a MultiToggle group.
 *
 * ```
 * <MultiToggleGroup>
 *   <Option id="option1" icon={<FiList />} onClick={() => console.log('Option 1 clicked')} />
 *   <Option id="option2" icon={<FiList />} onClick={() => console.log('Option 2 clicked')} />
 * </MultiToggleGroup>
 * ```
 */
export default function Option({ id, icon, isDisabled = false, onClick }: OptionProps) {
    return (
        <ToggleButton
            id={id}
            isDisabled={isDisabled}
            className={styles.option}
            onChange={onClick}
            data-testid={'toggle-test'}
        >
            {({ isSelected }) => {
                const optionClasses = buttonVariants({
                    variant: isSelected ? 'default' : 'ghost',
                });

                return <div className={`${optionClasses} ${styles.button}`}>{icon}</div>;
            }}
        </ToggleButton>
    );
}
