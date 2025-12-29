import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FullScreen } from '.';

vi.mock('../Portal', () => ({
    Portal: ({ children }: { children: React.ReactNode }) => <div data-testid="portal-root">{children}</div>,
}));

vi.mock('./FullScreen.module.scss', () => ({
    default: {
        root: 'fullscreen-root',
    },
}));

describe('FullScreen', () => {
    const TestContent = () => <div data-testid="test-content">Test Content</div>;

    it('renders children directly when not in full-screen mode', () => {
        render(
            <FullScreen>
                <TestContent />
            </FullScreen>,
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(screen.queryByTestId('portal-root')).not.toBeInTheDocument();
    });

    it('renders children in portal when in full-screen mode', () => {
        render(
            <FullScreen isFullScreen>
                <TestContent />
            </FullScreen>,
        );

        const portal = screen.getByTestId('portal-root');
        expect(portal).toBeInTheDocument();
        expect(within(portal).getByTestId('test-content')).toBeInTheDocument();
    });

    it('applies correct styles in full-screen mode', () => {
        render(
            <FullScreen isFullScreen>
                <TestContent />
            </FullScreen>,
        );

        const rootDiv = screen.getByTestId('portal-root').firstChild as HTMLElement;
        expect(rootDiv).toHaveClass('fullscreen-root');
    });

    it('handles undefined children', () => {
        render(<FullScreen isFullScreen>{undefined}</FullScreen>);

        expect(screen.getByTestId('portal-root')).toBeInTheDocument();
    });

    it('handles multiple children', () => {
        render(
            <FullScreen isFullScreen>
                <div data-testid="child-1">Child 1</div>
                <div data-testid="child-2">Child 2</div>
            </FullScreen>,
        );

        const portal = screen.getByTestId('portal-root');
        expect(within(portal).getByTestId('child-1')).toBeInTheDocument();
        expect(within(portal).getByTestId('child-2')).toBeInTheDocument();
    });

    it('toggles between normal and full-screen modes', () => {
        const { rerender } = render(
            <FullScreen>
                <TestContent />
            </FullScreen>,
        );

        expect(screen.queryByTestId('portal-root')).not.toBeInTheDocument();

        rerender(
            <FullScreen isFullScreen>
                <TestContent />
            </FullScreen>,
        );
        expect(screen.getByTestId('portal-root')).toBeInTheDocument();

        rerender(
            <FullScreen>
                <TestContent />
            </FullScreen>,
        );
        expect(screen.queryByTestId('portal-root')).not.toBeInTheDocument();
    });
});
