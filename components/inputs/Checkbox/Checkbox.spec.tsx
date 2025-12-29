import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Checkbox from '.';
import styles from './Checkbox.module.scss';

describe('<Checkbox />', () => {
    describe('initial render', () => {
        it('checked', () => {
            render(<Checkbox value />);
            expect(screen.getByTestId('checkbox-input')).toBeChecked();
        });

        it('unchecked', () => {
            render(<Checkbox value={false} />);
            expect(screen.getByTestId('checkbox-input')).not.toBeChecked();
        });

        it('indeterminate', () => {
            render(<Checkbox indeterminate />);
            const el = screen.getByTestId('checkbox-input') as HTMLInputElement;
            expect(el.indeterminate).toBe(true);
        });

        it('disabled', () => {
            render(<Checkbox disabled />);
            expect(screen.getByTestId('checkbox-input')).toBeDisabled();
        });

        it('destructive', () => {
            render(<Checkbox destructive />);
            expect(screen.getByTestId('checkbox-label')).toHaveClass(styles.destructive);
        });
    });

    describe('label', () => {
        it('renders text label', () => {
            render(<Checkbox label="Test Label" />);
            expect(screen.getByText('Test Label')).toBeInTheDocument();
        });

        it('renders React node label', () => {
            render(<Checkbox label={<span data-testid="custom-label">Custom Label</span>} />);
            expect(screen.getByTestId('custom-label')).toBeInTheDocument();
        });

        it('aligns label to the left', () => {
            render(<Checkbox label="Left Label" alignLabel="left" />);
            const label = screen.getByTestId('checkbox-label');
            expect(screen.getByText('Left Label')).toBe(label.firstElementChild);
        });

        it('aligns label to the right by default', () => {
            render(<Checkbox label="Right Label" />);
            const label = screen.getByTestId('checkbox-label');
            expect(screen.getByText('Right Label')).toBe(label.lastElementChild);
        });
    });

    describe('onChange', () => {
        it('calls onChange when clicked', async () => {
            const onChange = vi.fn();
            render(<Checkbox label="Test Checkbox" onChange={onChange} />);

            await userEvent.click(screen.getByTestId('checkbox-input'));
            expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));

            await userEvent.click(screen.getByTestId('checkbox-input'));
            expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
            expect(onChange).toHaveBeenCalledTimes(2);
        });

        it('does not call onChange when disabled', async () => {
            const onChange = vi.fn();
            render(<Checkbox label="Disabled Checkbox" onChange={onChange} disabled />);

            await userEvent.click(screen.getByTestId('checkbox-input'));
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard interaction', () => {
        it('responds to space key', async () => {
            const onChange = vi.fn();
            render(<Checkbox label="Keyboard Test" onChange={onChange} />);

            const checkbox = screen.getByTestId('checkbox-input');
            checkbox.focus();
            await userEvent.keyboard(' ');

            expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
        });

        it('maintains focus state', () => {
            render(<Checkbox label="Focus Test" />);
            const checkbox = screen.getByTestId('checkbox-input');

            checkbox.focus();
            expect(checkbox).toHaveFocus();
        });
    });

    describe('indeterminate behavior', () => {
        it('updates indeterminate state when prop changes', () => {
            const { rerender } = render(<Checkbox indeterminate />);
            const checkbox = screen.getByTestId('checkbox-input') as HTMLInputElement;
            expect(checkbox.indeterminate).toBe(true);

            rerender(<Checkbox indeterminate={false} />);
            expect(checkbox.indeterminate).toBe(false);
        });

        it('maintains checked state independent of indeterminate', () => {
            render(<Checkbox indeterminate value={true} />);
            const checkbox = screen.getByTestId('checkbox-input') as HTMLInputElement;
            expect(checkbox.indeterminate).toBe(true);
            expect(checkbox).toBeChecked();
        });
    });

    describe('accessibility', () => {
        it('has accessible name from label', () => {
            render(<Checkbox label="Accessible Label" />);
            expect(screen.getByTestId('checkbox-input')).toHaveAccessibleName('Accessible Label');
        });

        it('associates label with input using htmlFor', () => {
            render(<Checkbox label="Test Label" id="test-id" />);
            const label = screen.getByTestId('checkbox-label');
            const input = screen.getByTestId('checkbox-input');

            expect(label).toHaveAttribute('for', 'test-id');
            expect(input).toHaveAttribute('id', 'test-id');
        });
    });
});
