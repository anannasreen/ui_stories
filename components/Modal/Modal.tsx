import React, { ReactNode, MouseEvent, useState } from 'react';
import { Modal as ReactAriaModal, Dialog, ModalOverlay } from 'react-aria-components';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import css from './Modal.module.scss';
import { ModalTitle } from './ModalTitle';
import { ModalCloseButton } from './ModalCloseButton';
import ModalContext from './context';
import { Divider } from '../Divider';

export interface Props {
    /** Whether the modal is open or closed. */
    isOpen: boolean;
    /** A title to be displayed in a header at the top of the modal. Also adds a close button. */
    title?: ReactNode;
    /** Content to be displayed inside the modal. */
    children: ReactNode;
    /** Will be passed as a class on the modal window container. */
    className?: string;
    /** Function that will be run when the modal requests to be closed. */
    onClose: (e?: MouseEvent) => void;
    /** CSS class to be applied to the overlay under the modal. */
    overlayClassName?: string;
    /** Close the modal on escape keypress (defaults to true). */
    shouldCloseOnEsc?: boolean;
    /** Boolean indicating if the overlay should close the modal. Defaults to true. */
    shouldCloseOnOverlayClick?: boolean;
    /** Object indicating styles to be used for the modal, divided into overlay and content styles. */
    style?: {
        content?: React.CSSProperties | undefined;
        overlay?: React.CSSProperties | undefined;
    };
}

/**
 * A general-purpose modal component. It uses react-aria-components
 * to ensure good accessibility.
 *
 * Use the `title` prop for a nice default header, or use `<ModalTitle>` and `<ModalCloseButton>` for
 * accessible custom layouts.
 */
export default function Modal({
    className,
    isOpen,
    onClose,
    title,
    children,
    style,
    overlayClassName,
    shouldCloseOnEsc = true,
    shouldCloseOnOverlayClick = true,
    ...etc
}: Props) {
    const [id] = useState(nanoid());

    return (
        <ModalOverlay
            className={clsx(css.overlay, overlayClassName)}
            isOpen={isOpen}
            onOpenChange={(open) => !open && onClose()}
            isDismissable={shouldCloseOnOverlayClick}
            isKeyboardDismissDisabled={!shouldCloseOnEsc}
            data-testid="modal-overlay"
        >
            <ReactAriaModal
                isOpen={isOpen}
                isDismissable={shouldCloseOnOverlayClick}
                isKeyboardDismissDisabled={!shouldCloseOnEsc}
                className={clsx(className, css.root)}
                data-testid="modal-wrapper"
                {...etc}
            >
                <Dialog
                    className={clsx(className, css.root)}
                    aria-labelledby={title ? `modal-heading-${id}` : undefined}
                    style={style?.content}
                    data-testid="modal-content"
                    {...etc}
                >
                    <ModalContext.Provider value={{ id, onClose }}>
                        {title && (
                            <>
                                <div className={css.header} data-testid="modal-header">
                                    <ModalTitle>{title}</ModalTitle>
                                    <ModalCloseButton aria-label="Close" data-testid="modal-close-button" />
                                </div>
                                <Divider data-testid="modal-divider" />
                            </>
                        )}
                        <div className={css.content} data-testid="modal-body">
                            {children}
                        </div>
                    </ModalContext.Provider>
                </Dialog>
            </ReactAriaModal>
        </ModalOverlay>
    );
}
