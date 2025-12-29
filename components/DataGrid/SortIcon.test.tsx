import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SortIcon from './SortIcon';

describe('SortIcon', () => {
    it('renders up caret for ascending direction', () => {
        render(<SortIcon direction="asc" />);
        expect(screen.getByTestId('caret-up')).toBeInTheDocument();
        expect(screen.queryByTestId('caret-down')).not.toBeInTheDocument();
    });

    it('renders down caret for descending direction', () => {
        render(<SortIcon direction="desc" />);
        expect(screen.getByTestId('caret-down')).toBeInTheDocument();
        expect(screen.queryByTestId('caret-up')).not.toBeInTheDocument();
    });

    it('renders down caret when direction is false', () => {
        render(<SortIcon direction={false} />);
        expect(screen.getByTestId('caret-down')).toBeInTheDocument();
        expect(screen.queryByTestId('caret-up')).not.toBeInTheDocument();
    });

    it('applies custom className to icon', () => {
        const customClass = 'custom-class';
        render(<SortIcon direction="asc" className={customClass} />);
        expect(screen.getByTestId('caret-up')).toHaveClass(customClass);
    });

    it('applies default size to icon', () => {
        render(<SortIcon direction="asc" />);
        const icon = screen.getByTestId('caret-up');
        expect(icon).toHaveAttribute('height', '1em');
        expect(icon).toHaveAttribute('width', '1em');
    });
});
