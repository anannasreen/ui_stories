import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Framer from './Framer';
import useActiveFrames from './useActiveFrames';
import styles from './Framer.module.scss';

vi.mock('./useActiveFrames', () => ({
    default: vi.fn(),
}));

vi.mock('./StripedBorder', () => ({
    default: ({ children, visible, colors, className, ...props }: any) => (
        <div
            data-testid="striped-border"
            data-visible={visible}
            data-colors={colors?.join(',')}
            className={className}
            {...props}
        >
            {children}
        </div>
    ),
}));

vi.mock('./Tags', () => ({
    default: ({ children, onTransitionEnd }: any) => (
        <div data-testid="tags" onTransitionEnd={onTransitionEnd}>
            {children}
        </div>
    ),
}));

vi.mock('./Tag', () => ({
    default: ({ children, color, width, onlyChild }: any) => (
        <div data-testid="tag" data-color={color} data-width={width} data-only-child={onlyChild}>
            {children}
        </div>
    ),
}));

describe('Framer', () => {
    const mockApi = vi.fn();
    const mockFrames = [
        { id: '1', color: 'red', width: 100, renderTag: () => <div>Frame 1</div> },
        { id: '2', color: 'blue', width: 150, renderTag: () => <div>Frame 2</div> },
    ];

    beforeEach(() => {
        (useActiveFrames as jest.Mock).mockReturnValue({
            api: mockApi,
            isActive: true,
            currentFrames: mockFrames,
            safeToDeactivate: vi.fn(),
        });
    });

    it('renders children content', () => {
        render(
            <Framer>
                <div>Test Content</div>
            </Framer>,
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies correct classes', () => {
        const customClass = 'custom-class';
        render(<Framer className={customClass}>Content</Framer>);

        const border = screen.getByTestId('striped-border');
        expect(border).toHaveClass(styles.Framer, customClass);
    });

    it('renders frames with correct props', () => {
        render(<Framer>Content</Framer>);

        const tags = screen.getAllByTestId('tag');
        expect(tags).toHaveLength(2);

        expect(tags[0]).toHaveAttribute('data-color', 'red');
        expect(tags[0]).toHaveAttribute('data-width', '100');
        expect(tags[0]).toHaveAttribute('data-only-child', 'false');

        expect(tags[1]).toHaveAttribute('data-color', 'blue');
        expect(tags[1]).toHaveAttribute('data-width', '150');
    });

    it('passes stripe properties to StripedBorder', () => {
        const stripeWidth = 30;
        render(<Framer stripeWidth={stripeWidth}>Content</Framer>);

        const border = screen.getByTestId('striped-border');
        expect(border).toHaveAttribute('data-visible', 'true');
        expect(border).toHaveAttribute('data-colors', 'red,blue');
    });

    it('uses default stripe width when not provided', () => {
        render(<Framer>Content</Framer>);

        const border = screen.getByTestId('striped-border');
        expect(border).toBeInTheDocument();
    });

    it('handles inactive state', () => {
        (useActiveFrames as jest.Mock).mockReturnValue({
            api: mockApi,
            isActive: false,
            currentFrames: [],
            safeToDeactivate: vi.fn(),
        });

        render(<Framer>Content</Framer>);

        const border = screen.getByTestId('striped-border');
        expect(border).toHaveAttribute('data-visible', 'false');
    });

    it('renders single frame as only child', () => {
        (useActiveFrames as jest.Mock).mockReturnValue({
            api: mockApi,
            isActive: true,
            currentFrames: [mockFrames[0]],
            safeToDeactivate: vi.fn(),
        });

        render(<Framer>Content</Framer>);

        const tag = screen.getByTestId('tag');
        expect(tag).toHaveAttribute('data-only-child', 'true');
    });

    it('passes through additional HTML props', () => {
        render(
            <Framer data-custom="test" aria-label="framer">
                Content
            </Framer>,
        );

        const border = screen.getByTestId('striped-border');
        expect(border).toHaveAttribute('data-custom', 'test');
        expect(border).toHaveAttribute('aria-label', 'framer');
    });
});
