import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Progress from '.';

vi.mock('./Progress.module.scss', () => ({
    default: {
        spinner: 'spinner-class',
        paused: 'paused-class',
        'loader-rotate': 'loader-rotate-animation',
    },
}));

describe('Progress', () => {
    it('should render with default props', () => {
        render(<Progress data-testid="progress" />);
        const progress = screen.getByTestId('progress');

        expect(progress).toBeInTheDocument();
        expect(progress).toHaveClass('spinner-class');
        expect(progress).toHaveStyle({
            '--color': 'currentColor',
            '--duration': '1s',
            '--size': '16px',
            '--border-size': 'calc(16px / 8)',
        });
    });

    it('should apply custom styles', () => {
        render(
            <Progress
                data-testid="progress"
                color="rgb(255, 0, 0)"
                duration="2s"
                size="32px"
                borderSize="4px"
                space="8px"
            />,
        );

        const progress = screen.getByTestId('progress');
        expect(progress).toHaveStyle({
            '--color': 'rgb(255, 0, 0)',
            '--duration': '2s',
            '--size': '32px',
            '--border-size': '4px',
            margin: '8px',
        });
    });

    it('should merge custom className', () => {
        render(<Progress data-testid="progress" className="custom-class" />);

        const progress = screen.getByTestId('progress');
        expect(progress).toHaveClass('spinner-class', 'custom-class');
    });

    it('should apply paused class when paused', () => {
        render(<Progress data-testid="progress" paused />);

        const progress = screen.getByTestId('progress');
        expect(progress).toHaveClass('spinner-class', 'paused-class');
    });

    it('should merge custom styles', () => {
        render(<Progress data-testid="progress" style={{ backgroundColor: 'rgb(255, 0, 0)' }} />);

        const progress = screen.getByTestId('progress');
        expect(progress).toHaveStyle({
            '--color': 'currentColor',
            '--duration': '1s',
            '--size': '16px',
            '--border-size': 'calc(16px / 8)',
            'background-color': 'rgb(255, 0, 0)',
        });
    });

    it('should handle all custom props together', () => {
        render(
            <Progress
                data-testid="progress"
                className="custom-class"
                color="rgb(0, 0, 255)"
                duration="0.5s"
                size="24px"
                borderSize="3px"
                space="16px"
                style={{ backgroundColor: 'rgb(255, 0, 0)' }}
                paused
            />,
        );

        const progress = screen.getByTestId('progress');
        expect(progress).toHaveClass('spinner-class', 'custom-class', 'paused-class');
        expect(progress).toHaveStyle({
            '--color': 'rgb(0, 0, 255)',
            '--duration': '0.5s',
            '--size': '24px',
            '--border-size': '3px',
            margin: '16px',
            'background-color': 'rgb(255, 0, 0)',
        });
    });
});
