import React, { useCallback } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy as CopyIcon } from 'react-icons/fa';
import Button, { ButtonProps } from '.';
import Notifications from '../notifications/store';

export interface Props extends ButtonProps {
    /** the text to copy */
    copyText: string;
    /** Copy success callback */
    onSuccess?: (message?: string) => void;
    /** Copy failure callback */
    onFailure?: (message?: string) => void;
    /** Message to pass the success callback */
    successMessage?: string;
    /** Message to pass the failure callback */
    failureMessage?: string;
}

/**
 * A Button that copies text to the clipboard.
 *
 * Customizable with all ButtonProps.
 */
export default function CopyButton({
    copyText,
    onSuccess = console.log,
    onFailure = console.error,
    successMessage = 'Text copied successfully',
    failureMessage = 'Could not copy text',
    icon = <CopyIcon />,
    title,
    ...props
}: Props) {
    const onCopy = useCallback(
        (text: string, result: boolean) => {
            if (result) {
                Notifications.add({ message: successMessage, type: 'success' });
                onSuccess?.(successMessage);
            } else {
                Notifications.add({ message: failureMessage, type: 'danger' });
                onFailure?.(failureMessage);
            }
        },
        [onSuccess, onFailure, successMessage, failureMessage],
    );

    return (
        <CopyToClipboard text={copyText} onCopy={onCopy}>
            <Button icon={icon} title={title} {...props} />
        </CopyToClipboard>
    );
}
