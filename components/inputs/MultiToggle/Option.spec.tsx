import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { FiList } from 'react-icons/fi';
import MultiToggleOption from './Option';

describe('MultiToggleOption', () => {
    it('renders with icon', () => {
        render(<MultiToggleOption id="test" icon={<FiList />} />);
        expect(screen.getByTestId('toggle-test')).toBeInTheDocument();
    });

    it('handles disabled state', async () => {
        const handleClick = vi.fn();
        render(<MultiToggleOption id="test" icon={<FiList />} isDisabled onClick={handleClick} />);

        const button = screen.getByTestId('toggle-test');
        expect(button).toBeDisabled();

        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        render(<MultiToggleOption id="test" icon={<FiList />} onClick={handleClick} />);

        await userEvent.click(screen.getByTestId('toggle-test'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
