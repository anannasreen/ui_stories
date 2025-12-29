import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MdCheckCircle, MdWarning } from 'react-icons/md';
import EventTimeline from './index';

const mockEvents = [
    {
        timestamp: '2025-03-07T12:07:30Z',
        icon: <MdCheckCircle />,
        title: 'System Online',
        imageUrl: 'test-image-1.jpg',
    },
    {
        timestamp: '2025-03-07T12:08:30Z',
        icon: <MdWarning />,
        title: 'Memory Warning',
        imageUrl: 'test-image-2.jpg',
    },
];

describe('EventTimeline', () => {
    it('renders all timeline events', () => {
        render(<EventTimeline events={mockEvents} />);

        // Check if timestamps are rendered
        mockEvents.forEach((event) => {
            const timestamps = screen.getAllByText(/^\d{2}:\d{2}:\d{2}$/);
            expect(timestamps.length).toBeGreaterThan(0);
        });

        // Check if titles are rendered
        mockEvents.forEach((event) => {
            const titles = screen.getAllByText(event.title);
            expect(titles.length).toBeGreaterThan(0);
        });
    });

    it('maintains chronological order of events', () => {
        render(<EventTimeline events={mockEvents} />);

        const timestamps = screen.getAllByText(/^\d{2}:\d{2}:\d{2}$/);
        const uniqueTimestamps = Array.from(new Set(timestamps.map((el) => el.textContent)));

        // Check if timestamps are in chronological order
        expect(uniqueTimestamps).toEqual([...uniqueTimestamps].sort());
    });

    it('renders icons correctly', () => {
        render(<EventTimeline events={mockEvents} />);

        // Check if icon containers are present
        const eventItems = screen.getAllByTestId('event-icon');
        expect(eventItems).toHaveLength(mockEvents.length);

        // Check if each event has an icon
        eventItems.forEach((icon) => {
            expect(icon).toBeInTheDocument();
        });
    });

    it('does not show popup for events without imageUrl', () => {
        const eventsWithoutImages = mockEvents.map(({ imageUrl, ...event }) => event);
        render(<EventTimeline events={eventsWithoutImages} />);

        // Popup should not exist in the document
        eventsWithoutImages.forEach((event) => {
            const button = screen.getByLabelText(event.title);
            userEvent.hover(button);
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });
    });

    it('shows image popup on hover for events with imageUrl', async () => {
        render(<EventTimeline events={mockEvents} />);

        const firstEvent = mockEvents[0];
        const button = screen.getByLabelText(`Show preview for ${firstEvent.title}`);

        // Initially, tooltip should not be visible
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        // Hover over first event and wait for tooltip
        await userEvent.hover(button);

        // Wait for tooltip to appear and verify image
        const img = await screen.findByAltText(`Preview for ${firstEvent.title}`);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', firstEvent.imageUrl);
    });
});
