import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FilterButton from './index';
import styles from './FilterButton.module.scss';

describe('FilterButton', () => {
    it('renders label correctly', () => {
        render(<FilterButton label="Category" />);
        expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('applies default style class', () => {
        const { container } = render(<FilterButton label="Default" />);
        expect(container.firstChild).toHaveClass(styles.filterButton);
        expect(container.firstChild).toHaveClass(styles.defaultStyle);
    });

    it('applies active style when isActive is true', () => {
        const { container } = render(<FilterButton label="Active" isActive />);
        expect(container.firstChild).toHaveClass(styles.active);
    });

    it('applies disabled style when disabled is true', () => {
        const { container } = render(<FilterButton label="Disabled" disabled />);
        expect(container.firstChild).toHaveClass(styles.disabled);
        expect(container.firstChild).toBeDisabled();
    });

    it('renders icon when provided', () => {
        const TestIcon = () => <svg data-testid="test-icon" />;
        render(<FilterButton label="With Icon" icon={<TestIcon />} />);

        const icon = screen.getByTestId('test-icon');
        const iconWrapper = icon.closest('span');
        expect(iconWrapper).toHaveClass(styles.icon);
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        render(<FilterButton label="Clickable" onClick={handleClick} />);

        await userEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', async () => {
        const handleClick = vi.fn();
        render(<FilterButton label="Disabled" disabled onClick={handleClick} />);

        const button = screen.getByRole('button', { name: 'Disabled' });
        expect(button).toBeDisabled();

        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies custom className alongside default classes', () => {
        const { container } = render(<FilterButton label="Custom" className="custom-class" />);
        expect(container.firstChild).toHaveClass(styles.filterButton);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('spreads additional props to button element', () => {
        render(<FilterButton label="Test" data-testid="test-button" aria-label="Test Button" />);
        const button = screen.getByTestId('test-button');
        expect(button).toHaveAttribute('aria-label', 'Test Button');
    });

    it('maintains proper button semantics', () => {
        render(<FilterButton label="Semantic" />);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
    });
});
