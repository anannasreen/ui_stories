import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormGroup from '.';
import styles from './FormGroup.module.scss';

describe('FormGroup', () => {
    it('should render children', () => {
        render(
            <FormGroup id="test-id">
                <input type="text" data-testid="test-input" />
            </FormGroup>,
        );
        expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });

    it('should render label when provided', () => {
        render(
            <FormGroup id="test-id" label="Test Label">
                <input type="text" />
            </FormGroup>,
        );
        const label = screen.getByText('Test Label');
        expect(label).toBeInTheDocument();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label).toHaveAttribute('for', 'test-id');
    });

    it('should render help text when provided', () => {
        render(
            <FormGroup id="test-id" helpText="Help message">
                <input type="text" />
            </FormGroup>,
        );
        const helpText = screen.getByText('Help message');
        expect(helpText).toBeInTheDocument();
        expect(helpText).toHaveClass(styles.helpText);
    });

    it('should render learn more content when provided', () => {
        render(
            <FormGroup id="test-id" learnMore={<a href="/help">Learn More</a>}>
                <input type="text" />
            </FormGroup>,
        );
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
        const { container } = render(
            <FormGroup id="test-id" error="Error message">
                <input type="text" />
            </FormGroup>,
        );
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass(styles.hasError);
    });

    it('should not show error class when error is false', () => {
        const { container } = render(
            <FormGroup id="test-id" error={false}>
                <input type="text" />
            </FormGroup>,
        );
        expect(container.firstChild).not.toHaveClass(styles.hasError);
    });

    it('should render suffix when provided', () => {
        const { container } = render(
            <FormGroup id="test-id" suffix="units">
                <input type="text" />
            </FormGroup>,
        );
        const suffix = screen.getByText('units');
        expect(suffix).toBeInTheDocument();
    });

    it('should apply disabled styles when disabled', () => {
        render(
            <FormGroup id="test-id" label="Test Label" disabled>
                <input type="text" disabled />
            </FormGroup>,
        );
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
    });

    it('should forward ref to wrapper div', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <FormGroup id="test-id" ref={ref}>
                <input type="text" />
            </FormGroup>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass(styles.formGroup);
    });

    it('should apply custom className to wrapper', () => {
        const { container } = render(
            <FormGroup id="test-id" className="custom-class">
                <input type="text" />
            </FormGroup>,
        );
        expect(container.firstChild).toHaveClass(styles.formGroup, 'custom-class');
    });

    it('should apply additional HTML props to wrapper div', () => {
        const { container } = render(
            <FormGroup id="test-id" data-testid="form-group" style={{ margin: '10px' }}>
                <input type="text" />
            </FormGroup>,
        );
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveAttribute('data-testid', 'form-group');
        expect(wrapper).toHaveStyle({ margin: '10px' });
    });
});
