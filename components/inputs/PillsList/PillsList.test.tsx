import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PillsList } from '.';

// Mock the close button SVG component
vi.mock('../assets/close-button.svg', () => ({
    default: () => <div data-testid="close-button" />,
}));

describe('PillsList', () => {
    const testItems = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
    ];

    it('renders list of items', () => {
        render(<PillsList items={testItems} />);

        testItems.forEach((item) => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    it('shows delete button for each item when not readonly', () => {
        render(<PillsList items={testItems} />);
        const deleteButtons = screen.getAllByTestId('close-button');
        expect(deleteButtons).toHaveLength(testItems.length);
    });

    it('hides delete buttons when readonly', () => {
        render(<PillsList items={testItems} readOnly />);
        const deleteButtons = screen.queryAllByTestId('close-button');
        expect(deleteButtons).toHaveLength(0);
    });

    it('disables delete buttons when disabled', () => {
        render(<PillsList items={testItems} disabled />);
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button).toBeDisabled();
        });
    });

    it('calls onDelete when delete button is clicked', async () => {
        const handleDelete = vi.fn();
        render(<PillsList items={testItems} onDelete={handleDelete} />);

        const deleteButtons = screen.getAllByRole('button');
        await userEvent.click(deleteButtons[0]);

        expect(handleDelete).toHaveBeenCalledWith(testItems[0], 0);
    });

    it('does not call onDelete when disabled', async () => {
        const handleDelete = vi.fn();
        render(<PillsList items={testItems} onDelete={handleDelete} disabled />);

        const deleteButtons = screen.getAllByRole('button');
        await userEvent.click(deleteButtons[0]);

        expect(handleDelete).not.toHaveBeenCalled();
    });

    it('applies correct ARIA attributes', () => {
        render(<PillsList items={testItems} />);

        const list = screen.getByRole('list');
        expect(list).toHaveAttribute('aria-label', 'List of pills');

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(testItems.length);

        const deleteButtons = screen.getAllByRole('button');
        deleteButtons.forEach((button, index) => {
            expect(button).toHaveAttribute('aria-label', `Remove ${testItems[index].label}`);
        });
    });

    it('handles empty items array', () => {
        render(<PillsList items={[]} />);
        const list = screen.getByRole('list');
        expect(list.children).toHaveLength(0);
    });

    it('handles undefined items', () => {
        render(<PillsList />);
        const list = screen.getByRole('list');
        expect(list.children).toHaveLength(0);
    });
});
