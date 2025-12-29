import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import NumberInput from '.';

vi.mock('nanoid', () => ({
    nanoid: () => 'test-id',
}));

describe('NumberInput', () => {
    it('should render basic input with default props', () => {
        render(<NumberInput />);
        const input = screen.getByRole('spinbutton');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('id', 'test-id');
        expect(input).toHaveAttribute('type', 'number');
    });

    it('should render label when provided', () => {
        render(<NumberInput label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('should render help text when provided', () => {
        render(<NumberInput helpText="Help message" />);
        expect(screen.getByText('Help message')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
        render(<NumberInput error="Error message" />);
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should render learn more content when provided', () => {
        render(<NumberInput learnMore={<a href="/help">Learn More</a>} />);
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should render suffix when provided', () => {
        render(<NumberInput suffix="units" />);
        expect(screen.getByText('units')).toBeInTheDocument();
    });

    it('should handle width prop', () => {
        const { container } = render(<NumberInput width="200px" />);
        expect(container.firstChild).toHaveStyle({ width: '200px' });
    });

    it('should handle disabled state', () => {
        render(<NumberInput disabled />);
        expect(screen.getByRole('spinbutton')).toBeDisabled();
    });

    describe('value handling', () => {
        it('should display empty string for null value', () => {
            render(<NumberInput value={null} />);
            expect(screen.getByRole('spinbutton')).toHaveValue(null);
        });

        it('should display empty string for NaN value', () => {
            render(<NumberInput value={NaN} />);
            expect(screen.getByRole('spinbutton')).toHaveValue(null);
        });

        it('should display numeric value when valid', () => {
            render(<NumberInput value={42} />);
            expect(screen.getByRole('spinbutton')).toHaveValue(42);
        });
    });

    describe('onChange handling', () => {
        it('should call onChange with parsed number value', async () => {
            const handleChange = vi.fn();
            render(<NumberInput onChange={handleChange} />);

            const input = screen.getByRole('spinbutton');
            await userEvent.type(input, '42');

            expect(handleChange).toHaveBeenCalledWith(42, expect.any(Object));
        });

        it('should handle decimal numbers', async () => {
            const handleChange = vi.fn();
            render(<NumberInput onChange={handleChange} />);

            const input = screen.getByRole('spinbutton');
            await userEvent.type(input, '42.5');

            expect(handleChange).toHaveBeenCalledWith(42.5, expect.any(Object));
        });
    });

    describe('validation', () => {
        it('should show error when value is below min', () => {
            render(<NumberInput value={5} min={10} />);
            expect(screen.getByText("This value can't be less than 10.")).toBeInTheDocument();
        });

        it('should show error when value is above max', () => {
            render(<NumberInput value={15} max={10} />);
            expect(screen.getByText("This value can't be greater than 10.")).toBeInTheDocument();
        });

        it('should not show min/max errors when value is within range', () => {
            const { container } = render(<NumberInput value={5} min={1} max={10} />);
            expect(container).not.toHaveTextContent("can't be less than");
            expect(container).not.toHaveTextContent("can't be greater than");
        });

        it('should prioritize custom error over min/max validation', () => {
            render(<NumberInput value={5} min={10} error="Custom error" />);
            expect(screen.getByText('Custom error')).toBeInTheDocument();
            expect(screen.queryByText("This value can't be less than 10.")).not.toBeInTheDocument();
        });
    });

    it('should forward ref to input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<NumberInput ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toBe(screen.getByRole('spinbutton'));
    });

    it('should apply additional HTML props to input element', () => {
        render(<NumberInput placeholder="Enter number" data-testid="custom-input" step={0.5} />);

        const input = screen.getByRole('spinbutton');
        expect(input).toHaveAttribute('placeholder', 'Enter number');
        expect(input).toHaveAttribute('data-testid', 'custom-input');
        expect(input).toHaveAttribute('step', '0.5');
    });
});
