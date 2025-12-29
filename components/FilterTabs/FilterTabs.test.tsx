import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FilterTabs from '.';

describe('FilterTabs', () => {
    const items = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
    ];

    it('renders all tabs', () => {
        render(<FilterTabs value="all" onChange={() => {}} items={items} />);

        items.forEach((item) => {
            expect(screen.getByRole('tab', { name: item.label })).toBeInTheDocument();
        });
    });

    it('shows correct selected state', () => {
        render(<FilterTabs value="active" onChange={() => {}} items={items} />);

        const activeTab = screen.getByRole('tab', { name: 'Active' });
        expect(activeTab).toHaveAttribute('aria-selected', 'true');

        const otherTabs = items
            .filter((item) => item.value !== 'active')
            .map((item) => screen.getByRole('tab', { name: item.label }));

        otherTabs.forEach((tab) => {
            expect(tab).toHaveAttribute('aria-selected', 'false');
        });
    });

    it('calls onChange when tab is clicked', async () => {
        const handleChange = vi.fn();
        render(<FilterTabs value="all" onChange={handleChange} items={items} />);

        await userEvent.click(screen.getByRole('tab', { name: 'Active' }));
        expect(handleChange).toHaveBeenCalledWith('active');
    });

    it('disables individual tabs', () => {
        const itemsWithDisabled = [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active', disabled: true },
            { value: 'completed', label: 'Completed' },
        ];

        render(<FilterTabs value="all" onChange={() => {}} items={itemsWithDisabled} />);

        const disabledTab = screen.getByRole('tab', { name: 'Active' });
        expect(disabledTab).toBeDisabled();
    });

    it('disables all tabs when disabled prop is true', () => {
        render(<FilterTabs value="all" onChange={() => {}} items={items} disabled />);

        const tabs = screen.getAllByRole('tab');
        tabs.forEach((tab) => {
            expect(tab).toBeDisabled();
        });
    });

    it('does not call onChange when disabled tab is clicked', async () => {
        const handleChange = vi.fn();
        const itemsWithDisabled = [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active', disabled: true },
            { value: 'completed', label: 'Completed' },
        ];

        render(<FilterTabs value="all" onChange={handleChange} items={itemsWithDisabled} />);

        await userEvent.click(screen.getByRole('tab', { name: 'Active' }));
        expect(handleChange).not.toHaveBeenCalled();
    });
});
