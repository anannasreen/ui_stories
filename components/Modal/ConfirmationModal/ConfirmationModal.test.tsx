import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal', () => {
    const defaultProps = {
        isOpen: true,
        onConfirm: vi.fn(),
        onCancel: vi.fn(),
        onClose: vi.fn(),
        ariaHideApp: false,
    };

    it('handles successful confirmation', async () => {
        const onConfirm = vi.fn().mockResolvedValue('success');
        const onClose = vi.fn();

        render(
            <ConfirmationModal {...defaultProps} onConfirm={onConfirm} onClose={onClose}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Continue'));

        expect(onConfirm).toHaveBeenCalled();
        await waitFor(() => {
            expect(onClose).toHaveBeenCalledWith('success');
        });
    });

    it('handles successful cancellation', async () => {
        const onCancel = vi.fn().mockResolvedValue('cancelled');
        const onClose = vi.fn();

        render(
            <ConfirmationModal {...defaultProps} onCancel={onCancel} onClose={onClose}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Cancel'));

        expect(onCancel).toHaveBeenCalled();
        await waitFor(() => {
            expect(onClose).toHaveBeenCalledWith('cancelled');
        });
    });

    it('shows error message on confirmation failure', async () => {
        const onConfirm = vi.fn().mockRejectedValue(new Error('Confirmation failed'));

        render(
            <ConfirmationModal {...defaultProps} onConfirm={onConfirm}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Continue'));

        expect(await screen.findByText('There was a problem confirming. Please try again.')).toBeInTheDocument();
    });

    it('shows error message on cancellation failure', async () => {
        const onCancel = vi.fn().mockRejectedValue(new Error('Cancellation failed'));

        render(
            <ConfirmationModal {...defaultProps} onCancel={onCancel}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Cancel'));

        expect(await screen.findByText('There was a problem canceling. Please try again.')).toBeInTheDocument();
    });

    it('disables buttons during confirmation', async () => {
        const onConfirm = vi.fn().mockImplementation(() => new Promise(() => {}));

        render(
            <ConfirmationModal {...defaultProps} onConfirm={onConfirm}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Continue'));

        const continueButton = screen.getByText('Continue').closest('button');
        const cancelButton = screen.getByText('Cancel').closest('button');

        expect(continueButton).toBeDisabled();
        expect(cancelButton).toBeDisabled();
    });

    it('disables buttons during cancellation', async () => {
        const onCancel = vi.fn().mockImplementation(() => new Promise(() => {}));

        render(
            <ConfirmationModal {...defaultProps} onCancel={onCancel}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Cancel'));

        const continueButton = screen.getByText('Continue').closest('button');
        const cancelButton = screen.getByText('Cancel').closest('button');

        expect(continueButton).toBeDisabled();
        expect(cancelButton).toBeDisabled();
    });

    it('prevents multiple submissions', async () => {
        const onConfirm = vi.fn().mockImplementation(() => new Promise(() => {}));

        render(
            <ConfirmationModal {...defaultProps} onConfirm={onConfirm}>
                Test Message
            </ConfirmationModal>,
        );

        const continueButton = screen.getByText('Continue');
        await userEvent.click(continueButton);
        await userEvent.click(continueButton);
        await userEvent.click(continueButton);

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('clears error message when retrying after failure', async () => {
        const onConfirm = vi
            .fn()
            .mockRejectedValueOnce(new Error('First attempt fails'))
            .mockResolvedValueOnce('success');

        render(
            <ConfirmationModal {...defaultProps} onConfirm={onConfirm}>
                Test Message
            </ConfirmationModal>,
        );

        await userEvent.click(screen.getByText('Continue'));
        expect(await screen.findByText('There was a problem confirming. Please try again.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Continue'));
        await waitFor(() => {
            expect(screen.queryByText('There was a problem confirming. Please try again.')).not.toBeInTheDocument();
        });
    });
});
