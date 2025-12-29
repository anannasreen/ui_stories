import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './index';
import { describe, it, expect } from 'vitest';

const mockItems = [
    {
        id: '1',
        title: 'System Requirements',
        children: <p>Details about system requirements here.</p>,
    },
    {
        id: '2',
        title: 'Installation Guide',
        children: <p>Step by step installation instructions.</p>,
    },
];

describe('Accordion', () => {
    it('renders all accordion items', () => {
        render(<Accordion items={mockItems} />);
        mockItems.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });

    it('expands and collapses sections on click', async () => {
        render(<Accordion items={mockItems} />);

        // Initially content should be hidden
        expect(screen.queryByText('Details about system requirements here.')).not.toBeVisible();

        // Click to expand
        await userEvent.click(screen.getByText('System Requirements'));
        expect(screen.getByText('Details about system requirements here.')).toBeVisible();

        // Click to collapse
        await userEvent.click(screen.getByText('System Requirements'));
        expect(screen.queryByText('Details about system requirements here.')).not.toBeVisible();
    });

    it('supports keyboard navigation', async () => {
        render(<Accordion items={mockItems} />);

        // Tab to first button
        await userEvent.tab();
        const firstButton = screen.getByRole('button', { name: 'System Requirements' });
        expect(firstButton).toHaveFocus();

        // Space to expand
        await userEvent.keyboard('[Space]');
        expect(screen.getByText('Details about system requirements here.')).toBeVisible();

        // Tab to next button
        await userEvent.tab();
        const secondButton = screen.getByRole('button', { name: 'Installation Guide' });
        expect(secondButton).toHaveFocus();

        // Enter to expand
        await userEvent.keyboard('[Enter]');
        expect(screen.getByText('Details about system requirements here.')).toBeVisible();

        // Home to focus first button
        await userEvent.keyboard('[Home]');
        expect(firstButton).toHaveFocus();

        // Tab to previous button
        await userEvent.tab();
        await userEvent.tab({ shift: true });
        expect(firstButton).toHaveFocus();

        // End to focus last button
        await userEvent.keyboard('[End]');
        expect(secondButton).toHaveFocus();
    });

    it('respects disabled state', async () => {
        const disabledItems = [
            {
                ...mockItems[0],
                isDisabled: true,
            },
            mockItems[1],
        ];

        render(<Accordion items={disabledItems} />);

        // Try to click disabled section
        await userEvent.click(screen.getByText('System Requirements'));
        expect(screen.queryByText('Details about system requirements here.')).not.toBeVisible();

        // Non-disabled section should still work
        await userEvent.click(screen.getByText('Installation Guide'));
        expect(screen.getByText('Step by step installation instructions.')).toBeVisible();
    });

    it('supports defaultExpandedKeys', () => {
        render(<Accordion items={mockItems} defaultExpandedKeys={['1']} />);

        // First section should be expanded by default
        expect(screen.getByText('Details about system requirements here.')).toBeVisible();
        // Second section should be collapsed
        expect(screen.queryByText('Step by step installation instructions.')).not.toBeVisible();
    });

    it('renders custom icon when provided', () => {
        const customIcon = <span data-testid="custom-icon">★</span>;
        render(<Accordion items={mockItems} customIcon={customIcon} />);

        // Should render custom icon for each item
        expect(screen.getAllByTestId('custom-icon')).toHaveLength(mockItems.length);
    });

    it('maintains proper ARIA attributes', () => {
        render(<Accordion items={mockItems} />);

        const buttons = screen.getAllByRole('button');
        buttons.forEach((button, index) => {
            // Button should have proper ARIA attributes
            expect(button).toHaveAttribute('aria-expanded');

            // Button should be inside a heading
            expect(button.closest('h3')).toBeInTheDocument();
        });
    });

    it('rotates chevron icon when expanded', async () => {
        render(<Accordion items={mockItems} />);

        const button = screen.getByText('System Requirements').closest('button');
        expect(button).toBeInTheDocument();

        // Initially not expanded
        expect(button?.closest('[data-expanded]')).not.toBeInTheDocument();

        // Click to expand
        await userEvent.click(button!);
        expect(button?.closest('[data-expanded]')).toBeInTheDocument();

        // Click to collapse
        await userEvent.click(button!);
        expect(button?.closest('[data-expanded]')).not.toBeInTheDocument();
    });
});
