import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Select from '.';

const options = [
    { value: '1', label: 'First Option' },
    { value: '2', label: 'Second Option' },
    { value: '3', label: 'Third Option' },
] as const;

const isElementPresent = (getElement: () => HTMLElement) => {
    try {
        getElement();
        return true;
    } catch (e) {
        return false;
    }
};

describe('Select Component', () => {
    it('renders with basic props', () => {
        render(<Select options={options} placeholder="Select an option" />);
        expect(screen.getByPlaceholderText('Select an option')).toBeDefined();
    });

    it('opens dropdown on click', async () => {
        render(<Select options={options} placeholder="Select an option" />);
        const button = screen.getByTestId('select-button');
        userEvent.click(button);
        expect(screen.getByText('First Option')).toBeDefined();
    });

    it('filters options when typing in search', async () => {
        render(<Select options={options} placeholder="Select an option" />);
        const button = screen.getByTestId('select-button');
        userEvent.click(button);
        const input = screen.getByTestId('select-input');
        userEvent.type(input, 'First');
        expect(screen.getByText('First Option')).toBeDefined();
        expect(isElementPresent(() => screen.getByText('Second Option'))).toBe(false);
    });

    it('supports keyboard navigation', async () => {
        const onChange = vi.fn();
        render(<Select options={options} placeholder="Select an option" onChange={onChange} />);
        const button = screen.getByTestId('select-button');
        userEvent.click(button);

        // Press arrow down to navigate
        userEvent.keyboard('{ArrowDown}');
        userEvent.keyboard('{Enter}');
        expect(onChange).toHaveBeenCalled();
        expect(onChange.mock.calls[0][0]).toBe('1');

        // Press arrow down again
        userEvent.keyboard('{ArrowDown}');
        userEvent.keyboard('{Enter}');
        expect(onChange).toHaveBeenCalled();
        expect(onChange.mock.calls[1][0]).toBe('1');
    });

    it('supports multiple selection', async () => {
        const onChange = vi.fn();
        render(<Select options={options} multiple placeholder="Select options" onChange={onChange} />);
        const button = screen.getByTestId('select-button');
        userEvent.click(button);

        // Select first option
        const firstOption = screen.getByText('First Option');
        userEvent.click(firstOption);
        expect(onChange).toHaveBeenCalled();
        expect(onChange.mock.calls[0][0]).toEqual(['1']);

        // Select second option
        const secondOption = screen.getByText('Second Option');
        userEvent.click(secondOption);
        expect(onChange).toHaveBeenCalled();
        expect(onChange.mock.calls[1][0]).toEqual(['1', '2']);
    });

    it('clears all selections in multiple mode', async () => {
        const onChange = vi.fn();
        render(
            <Select options={options} multiple value={['1', '2']} placeholder="Select options" onChange={onChange} />,
        );
        const button = screen.getByTestId('select-button');
        userEvent.click(button);

        // Find all Clear All buttons and get the one that's visible
        const clearAllButtons = screen.getAllByText('Clear All');
        // Find the button that's actually visible and clickable (not in a template)
        const clearButton = clearAllButtons.find((button) => {
            // Check if the button is in a visible container
            const container = button.closest('div[class*="clearAllContainer"]');
            return container && !container.closest('template');
        });

        if (!clearButton) {
            throw new Error('Could not find visible Clear All button');
        }

        userEvent.click(clearButton);
        expect(onChange).toHaveBeenCalled();
        expect(onChange.mock.calls[0][0]).toEqual([]);
    });

    it('handles disabled state', () => {
        render(<Select options={options} disabled placeholder="Select an option" />);
        const button = screen.getByTestId('select-button');
        expect(button).toHaveAttribute('disabled');
    });

    it('displays error message', () => {
        render(<Select options={options} error="This field is required" placeholder="Select an option" />);
        expect(screen.getByText('This field is required')).toBeDefined();
    });

    it('maintains focus after selection in multiple mode', async () => {
        render(<Select options={options} multiple placeholder="Select options" />);
        const button = screen.getByTestId('select-button');
        userEvent.click(button);

        const firstOption = screen.getByText('First Option');
        userEvent.click(firstOption);
        expect(screen.getByRole('listbox')).toBeDefined();
    });

    it('closes dropdown after selection in single mode', async () => {
        render(<Select options={options} placeholder="Select an option" />);
        const button = screen.getByTestId('select-button');
        userEvent.click(button);

        const firstOption = screen.getByText('First Option');
        userEvent.click(firstOption);
        await waitFor(() => {
            expect(isElementPresent(() => screen.getByRole('listbox'))).toBe(false);
        });
    });

    it('updates display when value prop changes externally', async () => {
        const { rerender } = render(<Select options={options} value="1" placeholder="Select an option" />);

        // Initial render should show the first option label
        expect(screen.getByTestId('select-input')).toHaveValue('First Option');

        // Update the value prop to the second option
        rerender(<Select options={options} value="2" placeholder="Select an option" />);

        // After rerender, it should show the second option label
        expect(screen.getByTestId('select-input')).toHaveValue('Second Option');

        // Update the value prop to the third option
        rerender(<Select options={options} value="3" placeholder="Select an option" />);

        // After rerender, it should show the third option label
        expect(screen.getByTestId('select-input')).toHaveValue('Third Option');
    });
});
