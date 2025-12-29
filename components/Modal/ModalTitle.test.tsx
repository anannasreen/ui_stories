import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ModalTitle } from './ModalTitle';
import ModalContext from './context';

describe('ModalTitle', () => {
    const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    afterEach(() => {
        mockConsoleError.mockClear();
    });

    it('renders title with correct id when inside modal context', () => {
        const modalId = 'test-modal';
        render(
            <ModalContext.Provider value={{ id: modalId, onClose: vi.fn() }}>
                <ModalTitle>Modal Title</ModalTitle>
            </ModalContext.Provider>,
        );

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Modal Title');
        expect(heading).toHaveAttribute('id', `modal-heading-${modalId}`);
    });

    it('applies custom className', () => {
        const customClass = 'custom-title';
        render(
            <ModalContext.Provider value={{ id: 'test', onClose: vi.fn() }}>
                <ModalTitle className={customClass}>Modal Title</ModalTitle>
            </ModalContext.Provider>,
        );

        const heading = screen.getByRole('heading');
        expect(heading).toHaveClass(customClass);
    });

    it('returns null and logs error when used outside modal context', () => {
        render(<ModalTitle>Modal Title</ModalTitle>);

        expect(screen.queryByRole('heading')).not.toBeInTheDocument();
        expect(mockConsoleError).toHaveBeenCalledWith('ModalTitle must be used inside a Modal component');
    });

    it('passes additional props to heading element', () => {
        render(
            <ModalContext.Provider value={{ id: 'test', onClose: vi.fn() }}>
                <ModalTitle data-testid="custom-title" aria-label="modal heading">
                    Modal Title
                </ModalTitle>
            </ModalContext.Provider>,
        );

        const heading = screen.getByRole('heading');
        expect(heading).toHaveAttribute('data-testid', 'custom-title');
        expect(heading).toHaveAttribute('aria-label', 'modal heading');
    });
});
