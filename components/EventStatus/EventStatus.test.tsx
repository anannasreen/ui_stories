import React from 'react';
import { render, screen } from '@testing-library/react';
import EventStatus from '.';
import styles from './EventStatus.module.scss';
import { variants } from '../Text';

describe('EventStatus Component', () => {
    const statusStyleMap = {
        open: styles.open,
        onHold: styles.onHold,
        inProgress: styles.inProgress,
        resolved: styles.resolved,
    } as const;

    const statusDisplayMap = {
        open: 'Open',
        onHold: 'On-Hold',
        inProgress: 'In-Progress',
        resolved: 'Resolved',
    } as const;

    const statuses = Object.keys(statusStyleMap) as Array<keyof typeof statusStyleMap>;

    it.each(statuses)('renders status variant correctly', (status) => {
        render(<EventStatus status={status} data-testid="event-status" />);
        const container = screen.getByTestId('event-status');
        const textElement = screen.getByText(statusDisplayMap[status]);

        // Check if container has the eventContainer class
        expect(container).toHaveClass(styles.eventContainer);

        // Check if the text content matches the display text
        expect(textElement).toHaveTextContent(statusDisplayMap[status]);

        // Check if the correct style class is applied
        expect(textElement).toHaveClass(statusStyleMap[status]);
    });

    it('uses Text component with correct variant', () => {
        render(<EventStatus status="open" />);
        const textElement = screen.getByText('Open');
        expect(textElement).toHaveClass(variants({ variant: 'body-sm-med' }));
    });

    it('maintains accessibility by using semantic text component', () => {
        const status = 'open';
        render(<EventStatus status={status} />);
        const textElement = screen.getByText('Open');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toBeVisible();
    });

    it('passes through HTML attributes', () => {
        render(<EventStatus status="open" aria-label="Status indicator" />);
        const container = screen.getByLabelText('Status indicator');
        expect(container).toHaveAttribute('aria-label', 'Status indicator');
    });
});
