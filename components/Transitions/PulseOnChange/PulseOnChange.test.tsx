import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PulseOnChange from '.';

const mockSet = vi.fn();
const mockScale = { set: mockSet };

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, animate, style, 'data-testid': testId = 'motion-div', ...props }: any) => (
            <div data-testid={testId} style={style} {...props}>
                {children}
            </div>
        ),
    },
    AnimatePresence: ({ children }: any) => children,
    useMotionValue: () => mockScale,
}));

describe('PulseOnChange', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render children', () => {
        render(<PulseOnChange>test content</PulseOnChange>);
        expect(screen.getByText('test content')).toBeInTheDocument();
    });

    it('should trigger scale animation when compare value changes', () => {
        const { rerender } = render(<PulseOnChange compare={1}>content</PulseOnChange>);

        expect(mockSet).not.toHaveBeenCalled();

        rerender(<PulseOnChange compare={2}>content</PulseOnChange>);

        expect(mockSet).toHaveBeenCalledWith(1.1);

        mockSet.mockClear();

        act(() => {
            vi.advanceTimersByTime(225 / 2);
        });

        expect(mockSet).toHaveBeenCalledWith(1);
    });

    it('should use custom duration and scale', () => {
        const { rerender } = render(
            <PulseOnChange compare={1} durationMs={1000}>
                content
            </PulseOnChange>,
        );

        rerender(
            <PulseOnChange compare={2} durationMs={1000}>
                content
            </PulseOnChange>,
        );

        expect(mockSet).toHaveBeenCalledWith(1.1);
        mockSet.mockClear();

        act(() => {
            vi.advanceTimersByTime(1000 / 2);
        });

        expect(mockSet).toHaveBeenCalledWith(1);
    });

    it('should not render content when hidden is true', () => {
        render(<PulseOnChange hidden>test content</PulseOnChange>);
        expect(screen.queryByText('test content')).not.toBeInTheDocument();
    });

    it('should handle null children', () => {
        render(<PulseOnChange>{null}</PulseOnChange>);
        const element = screen.getByTestId('motion-div');
        expect(element).toBeInTheDocument();
        expect(element).toBeEmpty();
    });

    it('should apply custom className and style', () => {
        render(
            <PulseOnChange className="test-class" style={{ color: 'red' }} data-testid="custom-test-id">
                content
            </PulseOnChange>,
        );

        const element = screen.getByTestId('custom-test-id');
        expect(element).toHaveClass('test-class');
        expect(element.style.color).toBe('red');
    });

    it('should cleanup timeout on unmount', () => {
        const { rerender, unmount } = render(<PulseOnChange compare={1}>content</PulseOnChange>);

        rerender(<PulseOnChange compare={2}>content</PulseOnChange>);

        unmount();

        act(() => {
            vi.advanceTimersByTime(225);
        });

        expect(mockSet).toHaveBeenCalledTimes(1);
    });
});
