import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FadeOnChange from '.';

const mockStart = vi.fn();
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, animate, 'data-testid': testId = 'motion-div', ...props }: any) => (
            <div data-testid={testId} {...props}>
                {children}
            </div>
        ),
    },
    useAnimation: () => ({
        start: mockStart,
    }),
}));

describe('FadeOnChange', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render children', () => {
        render(<FadeOnChange>test content</FadeOnChange>);
        expect(screen.getByText('test content')).toBeInTheDocument();
    });

    it('should trigger animation when children change', async () => {
        const { rerender } = render(<FadeOnChange>initial</FadeOnChange>);

        expect(mockStart).not.toHaveBeenCalled();

        rerender(<FadeOnChange>updated</FadeOnChange>);

        expect(mockStart).toHaveBeenCalledWith({
            opacity: 0,
            transition: { duration: 0.15 },
        });

        mockStart.mockClear();

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockStart).toHaveBeenCalledWith({
            opacity: 1,
            transition: { duration: 0.15 },
        });
    });

    it('should use custom duration', async () => {
        const { rerender } = render(<FadeOnChange durationMs={1000}>initial</FadeOnChange>);

        rerender(<FadeOnChange durationMs={1000}>updated</FadeOnChange>);

        expect(mockStart).toHaveBeenCalledWith({
            opacity: 0,
            transition: { duration: 0.5 },
        });
    });

    it('should use custom compare value', async () => {
        const { rerender } = render(
            <FadeOnChange compare={1}>
                <div>Content</div>
            </FadeOnChange>,
        );

        rerender(
            <FadeOnChange compare={2}>
                <div>Content</div>
            </FadeOnChange>,
        );

        expect(mockStart).toHaveBeenCalled();
    });

    it('should not trigger animation when compare value is the same', () => {
        const compareValue = { id: 1 };
        const { rerender } = render(
            <FadeOnChange compare={compareValue}>
                <div>Content</div>
            </FadeOnChange>,
        );

        rerender(
            <FadeOnChange compare={compareValue}>
                <div>Updated Content</div>
            </FadeOnChange>,
        );

        expect(mockStart).not.toHaveBeenCalled();
    });

    it('should pass through additional props to motion.div', () => {
        render(
            <FadeOnChange className="test-class" data-testid="custom-test-id">
                content
            </FadeOnChange>,
        );

        const element = screen.getByTestId('custom-test-id');
        expect(element).toHaveClass('test-class');
    });
});
