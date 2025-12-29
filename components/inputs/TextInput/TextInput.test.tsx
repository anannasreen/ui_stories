import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TextInput from '.';

vi.mock('nanoid', () => ({
    nanoid: () => 'test-id',
}));

describe('TextInput', () => {
    it('should render basic input with default props', () => {
        render(<TextInput />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('id', 'test-id');
        expect(input).toHaveAttribute('type', 'text');
    });

    it('should render label when provided', () => {
        render(<TextInput label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('should render help text when provided', () => {
        render(<TextInput helpText="Help message" />);
        expect(screen.getByText('Help message')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
        render(<TextInput error="Error message" />);
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should render learn more content when provided', () => {
        render(<TextInput learnMore={<a href="/help">Learn More</a>} />);
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should render suffix when provided', () => {
        render(<TextInput suffix="units" />);
        expect(screen.getByText('units')).toBeInTheDocument();
    });

    it('should handle width prop', () => {
        const { container } = render(<TextInput width="200px" />);
        expect(container.firstChild).toHaveStyle({ width: '200px' });
    });

    it('should handle disabled state', () => {
        render(<TextInput disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should call onChange with new value and event', async () => {
        const handleChange = vi.fn();
        render(<TextInput onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'new value');

        expect(handleChange).toHaveBeenCalledWith('new value', expect.any(Object));
    });

    it('should blur on Escape key', async () => {
        render(<TextInput />);
        const input = screen.getByRole('textbox');

        await userEvent.click(input);
        expect(input).toHaveFocus();

        await userEvent.keyboard('{Escape}');
        expect(input).not.toHaveFocus();
    });

    it('should forward ref to input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<TextInput ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toBe(screen.getByRole('textbox'));
    });

    it('should apply additional HTML props to input element', () => {
        render(<TextInput placeholder="Enter text" maxLength={10} data-testid="custom-input" />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('placeholder', 'Enter text');
        expect(input).toHaveAttribute('maxLength', '10');
        expect(input).toHaveAttribute('data-testid', 'custom-input');
    });

    it('should apply custom className to both wrapper and input', () => {
        const { container } = render(<TextInput className="custom-class" />);

        expect(container.firstChild).toHaveClass('custom-class');
        expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('should stop event propagation on Escape', async () => {
        const parentHandler = vi.fn();
        render(
            <div onKeyUp={parentHandler}>
                <TextInput />
            </div>,
        );

        const input = screen.getByRole('textbox');
        await userEvent.click(input);
        await userEvent.keyboard('{Escape}');

        expect(parentHandler).not.toHaveBeenCalled();
    });
});
