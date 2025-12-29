import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ListViewItem } from '.';

vi.mock('../../stories/assets/warning-icon.svg', () => ({
    default: () => <div data-testid="critical-priority-icon" />,
}));

vi.mock('../../stories/assets/error-icon.svg', () => ({
    default: () => <div data-testid="high-priority-icon" />,
}));

const defaultProps = {
    imageSrc: 'test-image.jpg',
    title: 'Tailgating',
    status: 'inProgress' as const,
    priority: 'normal' as const,
    location: 'Union Square Office',
    timestamp: '2025-02-06T12:36:43',
    camera: 'Camera 1',
    onClick: vi.fn(),
};

describe('ListViewItem', () => {
    it('renders with default props', () => {
        render(<ListViewItem {...defaultProps} />);

        expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
        expect(screen.getByText(/Tailgating/)).toBeInTheDocument();
        expect(screen.getByText('In-Progress')).toBeInTheDocument();
        expect(screen.getByText(/Camera 1/)).toBeInTheDocument();
        expect(screen.getByText(/Union Square Office/)).toBeInTheDocument();
        expect(screen.getByTestId('time-wrapper')).toBeInTheDocument();
    });

    describe('Priority Levels', () => {
        it('renders with normal priority by default', () => {
            render(<ListViewItem {...defaultProps} />);
            expect(screen.getByText('Tailgating')).toBeInTheDocument();
            expect(screen.queryByTestId('high-priority-icon')).not.toBeInTheDocument();
            expect(screen.queryByTestId('critical-priority-icon')).not.toBeInTheDocument();
        });

        it('renders with high priority and icon', () => {
            render(<ListViewItem {...defaultProps} priority="high" />);
            expect(screen.getByTestId('high-priority-icon')).toBeInTheDocument();
        });

        it('renders with critical priority and icon', () => {
            render(<ListViewItem {...defaultProps} priority="critical" />);
            expect(screen.getByTestId('critical-priority-icon')).toBeInTheDocument();
        });
    });

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn();
        render(<ListViewItem {...defaultProps} onClick={handleClick} />);

        const listItem = screen.getByRole('img').parentElement?.parentElement as HTMLElement;
        userEvent.click(listItem);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
