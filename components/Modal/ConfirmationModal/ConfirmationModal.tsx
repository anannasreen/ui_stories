import React, { useCallback, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import Modal, { ModalCloseButton, ModalTitle } from '..';
import { Props as ModalProps } from '../Modal';
import { Button, Progress } from '../..';
import { useCheckMounted } from '../../../hooks';

import styles from './ConfirmationModal.module.scss';

interface Props<T = any> extends Omit<ModalProps, 'onClose'> {
    /** Function called when the user confirms the action */
    onConfirm: (() => void) | (() => Promise<T>);
    /** Function called when the user cancels the action */
    onCancel: (() => void) | (() => Promise<T>);
    /** Optional callback when the modal is closed (with either confirm or cancel) */
    onClose?: (result?: T) => void;
    /** Text for the confirm button (defaults to "Continue") */
    confirmText?: string;
    /** Text for the cancel button (defaults to "Cancel") */
    cancelText?: string;
}

/**
 * ConfirmationModal component displays a modal dialog that requires user confirmation.
 * Handles async confirmation/cancellation with loading states and error handling.
 *
 * ```
 * <ConfirmationModal
 *   title="Confirm Action"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 *   confirmText="Delete"
 *   cancelText="Keep"
 * >
 *   Are you sure you want to delete this item?
 * </ConfirmationModal>
 * ```
 */
export default function ConfirmationModal({
    onConfirm: externalOnConfirm,
    onCancel: externalOnCancel,
    onClose,
    title,
    children,
    confirmText = 'Continue',
    cancelText = 'Cancel',
    ...etc
}: Props) {
    const [currentRequest, setCurrentRequest] = useState<'confirm' | 'cancel' | null>(null);
    const [lastError, setLastError] = useState<string | null>(null);
    const checkMounted = useCheckMounted();

    const onConfirm = useCallback(async () => {
        if (currentRequest) return;

        try {
            setCurrentRequest('confirm');
            setLastError(null);
            const result = await externalOnConfirm();

            onClose?.(result);
        } catch (e) {
            setLastError('There was a problem confirming. Please try again.');
        } finally {
            if (checkMounted()) {
                setCurrentRequest(null);
            }
        }
    }, [externalOnConfirm, onClose, currentRequest, checkMounted]);

    const onCancel = useCallback(async () => {
        if (currentRequest) return;

        try {
            setCurrentRequest('cancel');
            setLastError(null);

            const result = await externalOnCancel();
            onClose?.(result);
        } catch (e) {
            setLastError('There was a problem canceling. Please try again.');
        } finally {
            if (checkMounted()) {
                setCurrentRequest(null);
            }
        }
    }, [externalOnCancel, onClose, currentRequest, checkMounted]);

    return (
        <Modal
            style={{ content: { paddingTop: '2.5em', paddingLeft: '2em', paddingRight: '2em' } }}
            onClose={onCancel}
            data-testid="confirmation-modal"
            {...etc}
        >
            {title ? (
                <ModalTitle className={styles.title} data-testid="confirmation-title">
                    {title}
                </ModalTitle>
            ) : null}
            <div className={styles.message} data-testid="confirmation-message">
                {children}
            </div>
            <AnimatePresence>
                {lastError && (
                    <motion.div className={styles.errorMessage} data-testid="confirmation-error">
                        {lastError}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={clsx('input-row', styles.buttons)} data-testid="confirmation-buttons">
                <ModalCloseButton
                    title="Cancel [esc]"
                    disabled={!!currentRequest}
                    icon={currentRequest === 'cancel' ? <Progress /> : undefined}
                    data-testid="confirmation-cancel-button"
                >
                    {cancelText}
                </ModalCloseButton>
                <Button
                    color="primary"
                    icon={currentRequest === 'confirm' ? <Progress /> : <FaCheck />}
                    onClick={onConfirm}
                    disabled={!!currentRequest}
                    autoFocus
                    data-testid="confirmation-confirm-button"
                >
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
}
