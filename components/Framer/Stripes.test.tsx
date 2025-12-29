import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Stripes from './Stripes';
import styles from './Stripes.module.scss';

describe('Stripes', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders two stripe elements for transition handling', () => {
        render(<Stripes colors={['red', 'blue']} data-testid="stripe" />);
        const stripeElements = screen.getAllByTestId('stripe');
        expect(stripeElements).toHaveLength(2);
    });

    it('generates correct gradient definition', () => {
        const colors = ['red', 'blue'];
        render(<Stripes colors={colors} width={20} angle={-45} data-testid="stripe" />);

        const expectedGradient =
            'repeating-linear-gradient(-45deg, red calc(20px * 0) calc(20px * 1), blue calc(20px * 1) calc(20px * 2))';
        const stripeElement = screen.getAllByTestId('stripe')[0];
        expect(stripeElement).toHaveStyle({ '--bg-image': expectedGradient });
    });

    it('handles custom width as string', () => {
        const colors = ['red', 'blue'];
        render(<Stripes colors={colors} width="2rem" angle={-45} data-testid="stripe" />);

        const expectedGradient =
            'repeating-linear-gradient(-45deg, red calc(2rem * 0) calc(2rem * 1), blue calc(2rem * 1) calc(2rem * 2))';
        const stripeElement = screen.getAllByTestId('stripe')[0];
        expect(stripeElement).toHaveStyle({ '--bg-image': expectedGradient });
    });

    it('applies visibility class when visible', () => {
        render(<Stripes colors={['red', 'blue']} visible={true} data-testid="stripe" />);
        const stripeElement = screen.getAllByTestId('stripe')[0];
        expect(stripeElement).toHaveClass(styles.visible);
    });

    it('does not apply visibility class when not visible', () => {
        render(<Stripes colors={['red', 'blue']} visible={false} data-testid="stripe" />);
        const stripeElement = screen.getAllByTestId('stripe')[0];
        expect(stripeElement).not.toHaveClass(styles.visible);
    });

    it('handles color changes with transitions', () => {
        const { rerender } = render(<Stripes colors={['red', 'blue']} data-testid="stripe" />);

        const initialGradient =
            'repeating-linear-gradient(-45deg, red calc(20px * 0) calc(20px * 1), blue calc(20px * 1) calc(20px * 2))';
        const stripeElements = screen.getAllByTestId('stripe');
        expect(stripeElements[0]).toHaveStyle({ '--bg-image': initialGradient });

        // Change colors
        rerender(<Stripes colors={['green', 'yellow']} data-testid="stripe" />);

        const newGradient =
            'repeating-linear-gradient(-45deg, green calc(20px * 0) calc(20px * 1), yellow calc(20px * 1) calc(20px * 2))';
        expect(stripeElements[1]).toHaveStyle({ '--bg-image': newGradient });
    });

    it('applies custom className and style', () => {
        const customClass = 'custom-class';
        const customStyle = { margin: '10px' };

        render(<Stripes colors={['red', 'blue']} className={customClass} style={customStyle} data-testid="stripe" />);

        const stripeElements = screen.getAllByTestId('stripe');
        stripeElements.forEach((element) => {
            expect(element).toHaveClass(customClass);
            expect(element).toHaveStyle(customStyle);
        });
    });
});
