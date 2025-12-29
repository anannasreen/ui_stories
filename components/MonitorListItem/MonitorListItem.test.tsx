import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MonitorListItem from '.';
import styles from './MonitorListItem.module.scss';

// Mock SVG icons
vi.mock('../assets/monitorlist-high-priority.svg', () => ({
    default: () => <div data-testid="high-priority-icon" />,
}));

vi.mock('../assets/monitorlist-critical-priority.svg', () => ({
    default: () => <div data-testid="critical-priority-icon" />,
}));

const defaultProps = {
    image: 'test-image.jpg',
    issueTitle: 'Test Issue',
    cameraLocation: 'Test Location',
    time: '2025-03-22T09:15:58+05:30',
    sourceDevice: 'Test Camera',
    eventStatus: 'open' as const,
    priority: 'normal' as const,
    state: 'unread' as const,
    href: '/target-url',
};

describe('MonitorListItem', () => {
    it('renders with default props', () => {
        render(<MonitorListItem {...defaultProps} />);
        expect(screen.getByTestId('monitor-list-item')).toBeInTheDocument();
        expect(screen.getByText('Test Issue')).toBeInTheDocument();
        expect(screen.getByText('Test Location')).toBeInTheDocument();
        expect(screen.getByText('Test Camera')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
        expect(screen.queryByTestId('high-priority-icon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('critical-priority-icon')).not.toBeInTheDocument();
    });

    describe('Priority Styles', () => {
        it('applies normal priority styles by default', () => {
            render(<MonitorListItem {...defaultProps} />);
            const item = screen.getByTestId('monitor-list-item');
            expect(item.className).not.toContain(styles.high);
            expect(item.className).not.toContain(styles.critical);
        });

        it('applies high priority styles with icon', () => {
            render(<MonitorListItem {...defaultProps} priority="high" />);
            const item = screen.getByTestId('monitor-list-item');
            expect(item.className).toContain(styles.high);
            expect(screen.getByTestId('high-priority-icon')).toBeInTheDocument();
            expect(screen.getByText('Test Issue')).toBeInTheDocument();
        });

        it('applies critical priority styles with icon', () => {
            render(<MonitorListItem {...defaultProps} priority="critical" />);
            const item = screen.getByTestId('monitor-list-item');
            expect(item.className).toContain(styles.critical);
            expect(screen.getByTestId('critical-priority-icon')).toBeInTheDocument();
            expect(screen.getByText('Test Issue')).toBeInTheDocument();
        });
    });

    describe('Item States', () => {
        it('applies unread state styles', () => {
            render(<MonitorListItem {...defaultProps} state="unread" />);
            const item = screen.getByTestId('monitor-list-item');
            expect(item.className).toContain(styles.unRead);
        });

        it('applies read state styles', () => {
            render(<MonitorListItem {...defaultProps} state="read" />);
            const item = screen.getByTestId('monitor-list-item');
            expect(item.className).not.toContain(styles.unRead);
        });

        it('applies selected state styles', () => {
            render(<MonitorListItem {...defaultProps} state="selected" />);
            const item = screen.getByTestId('monitor-list-item');
            expect(item.className).toContain(styles.selected);
        });

        it('allows state transitions through parent component', async () => {
            const { rerender } = render(<MonitorListItem {...defaultProps} state="unread" />);
            const item = screen.getByTestId('monitor-list-item');

            // Initially unread
            expect(item.className).toContain(styles.unRead);

            // Parent can update to read state
            rerender(<MonitorListItem {...defaultProps} state="read" />);
            expect(screen.getByTestId('monitor-list-item').className).not.toContain(styles.unRead);

            // Parent can update to selected state
            rerender(<MonitorListItem {...defaultProps} state="selected" />);
            expect(screen.getByTestId('monitor-list-item').className).toContain(styles.selected);
        });
    });

    describe('Event Status', () => {
        it('renders open status', () => {
            render(<MonitorListItem {...defaultProps} eventStatus="open" />);
            expect(screen.getByText('Open')).toBeInTheDocument();
        });

        it('renders inProgress status', () => {
            render(<MonitorListItem {...defaultProps} eventStatus="inProgress" />);
            expect(screen.getByText('In-Progress')).toBeInTheDocument();
        });

        it('renders onHold status', () => {
            render(<MonitorListItem {...defaultProps} eventStatus="onHold" />);
            expect(screen.getByText('On-Hold')).toBeInTheDocument();
        });

        it('renders resolved status', () => {
            render(<MonitorListItem {...defaultProps} eventStatus="resolved" />);
            expect(screen.getByText('Resolved')).toBeInTheDocument();
        });
    });

    describe('Time Display', () => {
        it('displays time with TimeAgo component', () => {
            render(<MonitorListItem {...defaultProps} />);
            const timeAgo = screen.getByTestId('monitor-time');
            expect(timeAgo).toBeInTheDocument();
        });

        it('handles empty time string', () => {
            render(<MonitorListItem {...defaultProps} time="" />);
            expect(screen.getByTestId('monitor-time')).toBeInTheDocument();
        });

        it('handles invalid time string', () => {
            render(<MonitorListItem {...defaultProps} time="invalid-date" />);
            expect(screen.getByTestId('monitor-time')).toBeInTheDocument();
        });
    });

    describe('Event Handling', () => {
        // needs to be updated to handle href & assert on new location
        it.todo('handles click events');
    });
});
