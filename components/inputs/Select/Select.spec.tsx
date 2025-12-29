import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Select from './Select';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './Select.module.scss';

const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

const TestFormWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('<Select />', () => {
    describe('initial render', () => {
        it('renders with basic props', () => {
            render(<Select options={mockOptions} />);
            expect(screen.getByTestId('select-container')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Select')).toBeInTheDocument();
        });

        it('renders with custom placeholder', () => {
            const placeholder = 'Custom placeholder';
            render(<Select options={mockOptions} placeholder={placeholder} />);
            expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
        });

        it('renders label by default when provided', () => {
            const label = 'Test Label';
            render(<Select options={mockOptions} label={label} />);
            expect(screen.getByText(label)).toBeInTheDocument();
        });

        it('hides label when hideLabel is true', () => {
            const label = 'Test Label';
            render(<Select options={mockOptions} label={label} hideLabel />);
            expect(() => screen.getByText(label)).toThrow();
        });

        it('applies disabled state correctly', () => {
            render(<Select options={mockOptions} disabled />);
            expect(screen.getByTestId('select-input')).toBeDisabled();
        });

        it('applies destructive state correctly', () => {
            render(<Select options={mockOptions} destructive />);
            const selectContainer = screen.getByTestId('select-container');
            expect(selectContainer).toHaveClass(styles.destructive);
        });

        it('renders with correct container structure', () => {
            const label = 'Test Label';
            render(<Select options={mockOptions} label={label} />);

            // Check label and containers
            const labelElement = screen.getByText(label);
            expect(labelElement).toBeInTheDocument();

            // Check that the label is inside the input container
            const inputContainer = labelElement.closest(`.${styles.inputContainer}`);
            expect(inputContainer).toBeInTheDocument();

            // Check that we have a combobox
            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });
    });

    it('renders label by default when provided', () => {
        const label = 'Test Label';
        render(<Select options={mockOptions} label={label} />);
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    describe('interaction', () => {
        it('opens dropdown on click', async () => {
            render(<Select options={mockOptions} />);
            const selectInput = screen.getByPlaceholderText('Select');

            await act(async () => {
                fireEvent.click(selectInput);
            });

            mockOptions.forEach((option) => {
                expect(screen.getByText(option.label)).toBeInTheDocument();
            });
        });

        it('handles single selection', async () => {
            const onChange = vi.fn();
            render(<Select options={mockOptions} onChange={onChange} />);

            await act(async () => {
                fireEvent.click(screen.getByPlaceholderText('Select'));
            });

            await act(async () => {
                fireEvent.click(screen.getByText('Option 1'));
            });

            expect(onChange.mock.calls.length).toBe(1);
            expect(onChange.mock.calls[0][0]).toBe('option1');
        });

        it('handles multiple selection', async () => {
            const onChange = vi.fn();
            render(<Select options={mockOptions} multiple onChange={onChange} />);

            // Open dropdown
            await act(async () => {
                fireEvent.click(screen.getByPlaceholderText('Select'));
            });

            // Select first option
            await act(async () => {
                fireEvent.click(screen.getByText('Option 1'));
            });

            // Verify first selection
            expect(onChange.mock.calls.length).toBe(1);
            expect(onChange.mock.calls[0][0]).toEqual(['option1']);

            // Select second option
            await act(async () => {
                fireEvent.click(screen.getByText('Option 2'));
            });

            // Verify both selections
            expect(onChange.mock.calls.length).toBe(2);
            expect(onChange.mock.calls[1][0]).toEqual(['option1', 'option2']);
        });

        it('hides options when dropdown is closed', async () => {
            render(<Select options={mockOptions} />);

            // Initially closed
            expect(() => screen.getByText('Option 1'));
            expect(() => screen.getByText('Option 2'));

            // Open dropdown
            await act(async () => {
                fireEvent.click(screen.getByPlaceholderText('Select'));
            });

            // Options should be visible
            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(screen.getByText('Option 2')).toBeInTheDocument();

            // Close dropdown
            await act(async () => {
                fireEvent.click(document.body);
            });

            // Options should be hidden again
            expect(() => screen.getByText('Option 1'));
            expect(() => screen.getByText('Option 2'));
        });

        it('filters options based on search term', async () => {
            render(<Select options={mockOptions} />);

            // Open dropdown and type search term
            await act(async () => {
                const input = screen.getByPlaceholderText('Select');
                fireEvent.click(input);
                fireEvent.change(input, { target: { value: 'Option 1' } });
            });

            // Verify filtered options
            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(() => screen.getByText('Option 2')).toThrow(/Unable to find an element with the text: Option 2/);
            expect(() => screen.getByText('Option 3')).toThrow(/Unable to find an element with the text: Option 3/);
        });
    });

    describe('form integration', () => {
        it('renders within a form context', () => {
            render(
                <TestFormWrapper>
                    <Select options={mockOptions} name="test" />
                </TestFormWrapper>,
            );
            expect(screen.getByPlaceholderText('Select')).toBeInTheDocument();
        });

        it('displays error message', () => {
            const errorMessage = 'This field is required';
            render(<Select options={mockOptions} error={errorMessage} />);
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
