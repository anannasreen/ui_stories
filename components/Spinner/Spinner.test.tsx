import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Spinner } from '.';

vi.mock('./Spinner.module.scss', () => ({
    default: {
        spinner: 'spinner-class',
    },
}));

vi.mock('react-icons/fa', () => ({
    FaSpinner: ({ className, size, color, 'data-testid': testId, ...props }: any) => (
        <div data-testid={testId} className={className} style={{ width: size, height: size, color }} {...props} />
    ),
}));

describe('Spinner', () => {
    it('should render with default props', () => {
        render(<Spinner data-testid="spinner" />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('spinner-class');
    });

    it('should merge custom className with default spinner class', () => {
        render(<Spinner className="custom-class" data-testid="spinner" />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toHaveClass('custom-class', 'spinner-class');
    });

    it('should pass through additional props', () => {
        render(<Spinner data-testid="spinner" size={24} color="rgb(255, 0, 0)" />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toHaveStyle({
            width: '24px',
            height: '24px',
            color: 'rgb(255, 0, 0)',
        });
    });
});
