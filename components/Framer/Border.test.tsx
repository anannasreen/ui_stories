import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Border from './Border';
import styles from './Border.module.scss';

describe('Border', () => {
    it('renders border contents and children', () => {
        render(
            <Border borderContents={<div data-testid="border-content">Border Content</div>}>
                <div data-testid="child">Child Content</div>
            </Border>,
        );

        expect(screen.getByTestId('border-content')).toBeInTheDocument();
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('applies default thickness and visibility', () => {
        render(
            <Border borderContents={<div>Border</div>} data-testid="border">
                Content
            </Border>,
        );

        const border = screen.getByTestId('border');
        expect(border).toHaveStyle({
            '--thickness': '0px',
            '--visible': '1',
        });
    });

    it('applies custom thickness as number', () => {
        render(
            <Border borderContents={<div>Border</div>} thickness={5} data-testid="border">
                Content
            </Border>,
        );

        expect(screen.getByTestId('border')).toHaveStyle({
            '--thickness': '5px',
        });
    });

    it('applies custom thickness as string', () => {
        render(
            <Border borderContents={<div>Border</div>} thickness="2rem" data-testid="border">
                Content
            </Border>,
        );

        expect(screen.getByTestId('border')).toHaveStyle({
            '--thickness': '2rem',
        });
    });

    it('handles visibility prop', () => {
        render(
            <Border borderContents={<div>Border</div>} visible={false} data-testid="border">
                Content
            </Border>,
        );

        expect(screen.getByTestId('border')).toHaveStyle({
            '--visible': '0',
        });
    });

    it('applies custom className along with default styles', () => {
        const customClass = 'custom-class';
        render(
            <Border borderContents={<div>Border</div>} className={customClass} data-testid="border">
                Content
            </Border>,
        );

        const border = screen.getByTestId('border');
        expect(border).toHaveClass(styles.Border, customClass);
    });

    it('passes through additional HTML props', () => {
        render(
            <Border
                borderContents={<div>Border</div>}
                data-testid="border"
                aria-label="bordered content"
                style={{ color: 'rgb(255, 0, 0)' }}
            >
                Content
            </Border>,
        );

        const border = screen.getByTestId('border');
        expect(border).toHaveAttribute('aria-label', 'bordered content');
        expect(border).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('merges custom style with CSS variables', () => {
        render(
            <Border
                borderContents={<div>Border</div>}
                data-testid="border"
                style={{ color: 'rgb(255, 0, 0)' }}
                thickness={5}
                visible={false}
            >
                Content
            </Border>,
        );

        const border = screen.getByTestId('border');
        expect(border).toHaveStyle({
            color: 'rgb(255, 0, 0)',
            '--thickness': '5px',
            '--visible': '0',
        });
    });
});
