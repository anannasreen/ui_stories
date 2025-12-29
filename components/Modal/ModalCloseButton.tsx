import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button, { ButtonProps } from '../Button';
import ModalContext from './context';

export type Props = Omit<ButtonProps, 'onClick'>;

export function ModalCloseButton({
    icon = <FaTimes />,
    title = 'Close',
    'aria-label': ariaLabel = 'Close',
    ...etc
}: Props) {
    const modal = useContext(ModalContext);

    if (!modal) {
        console.error('ModalCloseButton must be used inside a Modal component');
        return null;
    }

    return (
        <Button
            variant="ghost"
            slot="close"
            icon={icon}
            title={title}
            aria-label={ariaLabel}
            onClick={modal.onClose}
            {...etc}
        />
    );
}
