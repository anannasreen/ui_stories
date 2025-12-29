import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import StripedBorder from './StripedBorder';
import styles from './Stripes.module.scss';

describe('StripedBorder', () => {
    const defaultProps = {
        colors: ['#000', '#fff'],
        children: <div>Test Content</div>,
    };

    it('renders Border with Stripes as borderContents', () => {
        render(<StripedBorder {...defaultProps} />);

        expect(screen.getByTestId('border')).toBeInTheDocument();
        const stripes = screen.queryAllByTestId('stripe');
        expect(stripes.length).toBe(2);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('passes visibility prop to both Border and Stripes', () => {
        render(<StripedBorder {...defaultProps} visible={false} />);

        expect(screen.getByTestId('border')).toHaveStyle({ '--visible': '0' });
        const stripes = screen.queryAllByTestId('stripe');
        for (const stripe of stripes) {
            expect(stripe).not.toHaveClass(styles.visible);
        }
    });

    it('passes stripe properties to Stripes component', () => {
        const stripeProps = {
            colors: ['#red', '#blue'],
            stripeWidth: 30,
            angle: 90,
        };

        const { debug } = render(<StripedBorder {...defaultProps} {...stripeProps} />);

        debug();

        const stripes = screen.queryAllByTestId('stripe');
        expect(stripes.length).toBe(2);
        for (const stripe of stripes) {
            expect(stripe).toHaveStyle({
                '--bg-image':
                    'repeating-linear-gradient(90deg, #red calc(30px * 0) calc(30px * 1), #blue calc(30px * 1) calc(30px * 2))',
            });
        }
        expect(stripes[0]).toHaveClass(styles.visible);
        // Should only be visible during transitions
        expect(stripes[1]).not.toHaveClass(styles.visible);
    });

    it('passes border properties to Border component', () => {
        const borderProps = {
            thickness: 5,
            className: 'custom-border',
            style: { margin: '10px' },
        };

        render(<StripedBorder {...defaultProps} {...borderProps} />);

        const border = screen.getByTestId('border');
        expect(border).toHaveClass('custom-border');
        expect(border).toHaveStyle({ margin: '10px', '--thickness': '5px' });
    });
});
