import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import VirtualizedList from '..';
import userEvent from '@testing-library/user-event';

describe('VirtualizedList', () => {
    const mockItems = Array.from({ length: 100 }, (_, i) => ({
        id: `item-${i}`,
        content: `Item ${i}`,
    }));

    const defaultProps = {
        items: mockItems,
        renderItem: (item: any) => <div data-testid={`item-${item.id}`}>{item.content}</div>,
        itemSize: 50,
    };

    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 50 });
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 50 });
    });

    it('renders without crashing', () => {
        render(<VirtualizedList {...defaultProps} />);
        expect(screen.getByTestId('virtualized-list')).toBeDefined();
    });

    it('handles firstVisibleItemIndex prop correctly', () => {
        render(<VirtualizedList {...defaultProps} firstVisibleItemIndex={5} />);

        expect(screen.getByTestId('item-item-5')).toBeDefined();
    });

    it('handles dynamic item sizes when itemSize prop is not provided', () => {
        render(<VirtualizedList {...defaultProps} itemSize={undefined} fitToContent={true} />);

        expect(screen.getByTestId('virtualized-list')).toBeDefined();
    });

    it('calls onVisibleItemsChanged when visible items change', () => {
        const onVisibleItemsChanged = vi.fn();

        render(<VirtualizedList {...defaultProps} onVisibleItemsChanged={onVisibleItemsChanged} />);

        expect(onVisibleItemsChanged).toHaveBeenCalled();
    });

    it('handles reversed prop correctly', () => {
        render(<VirtualizedList {...defaultProps} reversed={true} />);

        expect(screen.getByTestId('item-item-0')).toBeDefined();
    });

    it('handles frozen state correctly', () => {
        const { rerender } = render(<VirtualizedList {...defaultProps} frozen={true} />);

        rerender(<VirtualizedList {...defaultProps} frozen={false} jumpToStartOnThaw={true} />);

        expect(screen.getByTestId('item-item-0')).toBeDefined();
    });

    it('handles mouse events correctly', () => {
        const onMouseEnter = vi.fn();
        const onMouseLeave = vi.fn();

        render(<VirtualizedList {...defaultProps} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

        const container = screen.getByTestId('scrolling-container');

        userEvent.hover(container);
        expect(onMouseEnter).toHaveBeenCalled();

        userEvent.unhover(container);
        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('handles custom getItemId function', () => {
        const customGetItemId = (item: any) => `custom-${item.id}`;

        render(<VirtualizedList {...defaultProps} getItemId={customGetItemId} />);

        expect(screen.getByTestId('item-item-0')).toBeDefined();
    });

    it('uses custom getItemId function for rendering', () => {
        const customGetItemId = (item: any) => `custom-${item.id}`;

        const customProps = {
            ...defaultProps,
            getItemId: customGetItemId,
            renderItem: (item: any) => <div data-testid={`item-${customGetItemId(item)}`}>{item.content}</div>,
        };

        render(<VirtualizedList {...customProps} />);

        expect(screen.getByTestId('item-custom-item-0')).toBeDefined();
    });

    it('handles empty items array', () => {
        render(<VirtualizedList {...defaultProps} items={[]} />);

        expect(screen.getByTestId('virtualized-list')).toBeDefined();
        expect(screen.queryByTestId(/item-/)).toBeNull();
    });
});
