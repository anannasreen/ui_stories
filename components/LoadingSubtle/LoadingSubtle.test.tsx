import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoadingSubtle from './index';

vi.mock('./styles.module.scss', () => ({
    default: {
        LoadingSubtle: 'loading-subtle',
        dot: 'dot-class',
    },
}));

describe('LoadingSubtle', () => {
    it('renders with default props', () => {
        render(<LoadingSubtle />);

        const container = screen.getByTestId('loading-subtle');
        expect(container).toHaveClass('loading-subtle');
    });

    it('applies custom dot size', () => {
        render(<LoadingSubtle dotSize="0.25em" />);

        const container = screen.getByTestId('loading-subtle');
        expect(container).toHaveStyle({ '--dot-size': '0.25em' });
    });

    it('applies custom duration', () => {
        render(<LoadingSubtle duration="1s" />);

        const container = screen.getByTestId('loading-subtle');
        expect(container).toHaveStyle({ '--duration': '1s' });
    });

    it('applies custom height', () => {
        render(<LoadingSubtle height="2em" />);

        const container = screen.getByTestId('loading-subtle');
        expect(container).toHaveStyle({ '--height': '2em' });
    });

    it('combines custom className with default class', () => {
        render(<LoadingSubtle className="custom-class" />);

        const container = screen.getByTestId('loading-subtle');
        expect(container).toHaveClass('loading-subtle', 'custom-class');
    });

    it('passes through additional HTML attributes', () => {
        render(<LoadingSubtle aria-label="Loading" title="Loading content" />);

        const container = screen.getByTestId('loading-subtle');
        expect(container).toHaveAttribute('aria-label', 'Loading');
        expect(container).toHaveAttribute('title', 'Loading content');
    });
});
