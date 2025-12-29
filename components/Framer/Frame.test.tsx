import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Frame from './Frame';
import framedApiContext from './context';
import { usePortal } from '../Portal/hooks';
import styles from './Frame.module.scss';

vi.mock('../Portal/hooks', () => ({
    usePortal: vi.fn(() => ({
        send: vi.fn((content) => content),
        receive: vi.fn(),
        close: vi.fn(),
    })),
}));

describe('Frame', () => {
    const mockSetFrame = vi.fn();
    const defaultProps = {
        color: 'red',
        children: <div>Test Content</div>,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithContext = (ui: React.ReactNode) => {
        return render(<framedApiContext.Provider value={mockSetFrame}>{ui}</framedApiContext.Provider>);
    };

    it('renders content within frame', () => {
        renderWithContext(<Frame {...defaultProps} />);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('creates frame with correct props', () => {
        const props = {
            ...defaultProps,
            priority: 1,
            width: 200,
        };

        renderWithContext(<Frame {...props} />);

        expect(mockSetFrame).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                color: props.color,
                priority: props.priority,
                width: props.width,
                renderTag: expect.any(Function),
            }),
        );
    });

    it('uses default width when not provided', () => {
        renderWithContext(<Frame {...defaultProps} />);

        expect(mockSetFrame).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                width: 120,
            }),
        );
    });

    it('cleans up frame on unmount', () => {
        const { unmount } = renderWithContext(<Frame {...defaultProps} />);

        unmount();

        expect(mockSetFrame).toHaveBeenLastCalledWith(expect.any(String), undefined);
        expect(usePortal).toHaveReturnedWith(
            expect.objectContaining({
                close: expect.any(Function),
            }),
        );
    });

    it('updates frame when props change', () => {
        const { rerender } = renderWithContext(<Frame {...defaultProps} />);

        const newProps = {
            ...defaultProps,
            color: 'blue',
            width: 150,
        };

        rerender(
            <framedApiContext.Provider value={mockSetFrame}>
                <Frame {...newProps} />
            </framedApiContext.Provider>,
        );

        expect(mockSetFrame).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                color: 'blue',
                width: 150,
            }),
        );
    });

    it('throws error when used outside Framed context', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            render(<Frame {...defaultProps} />);
        }).toThrow('useFrame must be used within Framed');

        consoleError.mockRestore();
    });

    it('applies frame content class', () => {
        renderWithContext(<Frame {...defaultProps} />);
        expect(screen.getByText('Test Content').parentElement).toHaveClass(styles.frameContent);
    });
});
