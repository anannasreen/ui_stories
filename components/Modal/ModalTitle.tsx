import React, { ReactNode, useContext } from 'react';
import clsx from 'clsx';
import css from './Modal.module.scss';
import ModalContext from './context';

export interface Props extends React.HTMLProps<HTMLHeadingElement> {
    children: ReactNode;
}

export function ModalTitle({ children, className, id, ...etc }: Props) {
    const modal = useContext(ModalContext);

    if (!modal) {
        console.error('ModalTitle must be used inside a Modal component');
        return null;
    }

    return (
        <h2 className={clsx(className)} id={`modal-heading-${modal.id}`} role="heading" {...etc}>
            {children}
        </h2>
    );
}
