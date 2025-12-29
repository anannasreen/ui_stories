import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Modal from './Modal';
import { ModalTitle } from './ModalTitle';
import { ModalCloseButton } from './ModalCloseButton';

describe('Modal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
    };

    it('renders children when isOpen is true', () => {
        render(
            <Modal {...defaultProps}>
                <div data-testid="modal-children">Modal Content</div>
            </Modal>,
        );

        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        render(
            <Modal {...defaultProps} isOpen={false}>
                <div data-testid="modal-children">Modal Content</div>
            </Modal>,
        );

        expect(screen.queryByTestId('modal-children')).not.toBeInTheDocument();
    });

    it('renders title when provided', () => {
        render(
            <Modal {...defaultProps} title="Test Modal Title">
                <div>Modal Content</div>
            </Modal>,
        );

        expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
    });

    it('renders close button when title is provided', () => {
        render(
            <Modal {...defaultProps} title="Test Modal Title">
                <div>Modal Content</div>
            </Modal>,
        );

        const closeButton = screen.getByLabelText('Close');
        expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
        const onClose = vi.fn();

        render(
            <Modal {...defaultProps} onClose={onClose} title="Test Modal Title">
                <div>Modal Content</div>
            </Modal>,
        );

        const closeButton = screen.getByLabelText('Close');
        await userEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('applies custom className to modal', () => {
        render(
            <Modal {...defaultProps} className="custom-modal-class">
                <div>Modal Content</div>
            </Modal>,
        );

        const modalContent = screen.getByTestId('modal-content');
        expect(modalContent).toHaveClass('custom-modal-class');
    });

    it('works with custom ModalTitle and ModalCloseButton', () => {
        const onClose = vi.fn();

        render(
            <Modal {...defaultProps} onClose={onClose}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ModalTitle>Custom Title</ModalTitle>
                    <ModalCloseButton />
                </div>
                <div>Modal Content</div>
            </Modal>,
        );

        expect(screen.getByText('Custom Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('provides modal context to children', () => {
        const TestComponent = () => {
            return (
                <div data-testid="test-component">
                    <ModalTitle>Context Test</ModalTitle>
                </div>
            );
        };

        render(
            <Modal {...defaultProps}>
                <TestComponent />
            </Modal>,
        );

        expect(screen.getByText('Context Test')).toBeInTheDocument();
    });
});
