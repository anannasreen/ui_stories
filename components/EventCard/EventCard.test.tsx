import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { EventCard } from './EventCard';
import styles from './EventCard.module.scss';

describe('EventCard', () => {
    const defaultProps = {
        title: 'Test Event',
        location: 'Test Location',
        additionalInfo: 'Test Info',
        timestamp: '2025-03-11T12:00:00Z',
        sourceDevice: 'Test Camera',
        videoSrc: 'test-video.mp4',
        videoStartTime: '2025-03-11T12:00:00Z',
        videoEndTime: '2025-03-11T12:01:00Z',
    };

    it('renders EventCard with all components', () => {
        render(
            <EventCard priority="normal" size="large">
                <EventCard.Video
                    videoSrc={defaultProps.videoSrc}
                    startTime={defaultProps.videoStartTime}
                    endTime={defaultProps.videoEndTime}
                />
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultProps.title}
                        onOptionsClick={() => {}}
                        priority="normal"
                        sourceDevice={defaultProps.sourceDevice}
                    />
                    <EventCard.Details location={defaultProps.location} additionalInfo={defaultProps.additionalInfo} />
                    <EventCard.Footer timestamp={defaultProps.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>,
        );

        // Check that components are rendered
        expect(screen.getByText(defaultProps.title)).toBeDefined();
        expect(screen.getByText(defaultProps.location)).toBeDefined();
        expect(screen.getByText(defaultProps.additionalInfo)).toBeDefined();
        // Check for the formatted timestamp instead of raw ISO string
        expect(screen.getByText('03/11/25 12:00:00')).toBeDefined();
        expect(screen.getByText(defaultProps.sourceDevice)).toBeDefined();
    });

    it('renders EventCard without video', () => {
        render(
            <EventCard priority="normal">
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultProps.title}
                        onOptionsClick={() => {}}
                        priority="normal"
                        sourceDevice={defaultProps.sourceDevice}
                    />
                    <EventCard.Details location={defaultProps.location} additionalInfo={defaultProps.additionalInfo} />
                    <EventCard.Footer timestamp={defaultProps.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>,
        );

        expect(screen.getByText(defaultProps.title)).toBeDefined();
        expect(screen.getByText(defaultProps.location)).toBeDefined();
    });

    describe('Priority Variants', () => {
        it('applies critical priority styles', () => {
            const { container } = render(
                <EventCard priority="critical">
                    <EventCard.Content>
                        <EventCard.Header
                            title={defaultProps.title}
                            onOptionsClick={() => {}}
                            priority="critical"
                            sourceDevice={defaultProps.sourceDevice}
                        />
                    </EventCard.Content>
                </EventCard>,
            );

            expect(container.firstChild).toHaveClass(styles.criticalPriority);
        });

        it('applies high priority styles', () => {
            const { container } = render(
                <EventCard priority="high">
                    <EventCard.Content>
                        <EventCard.Header
                            title={defaultProps.title}
                            onOptionsClick={() => {}}
                            priority="high"
                            sourceDevice={defaultProps.sourceDevice}
                        />
                    </EventCard.Content>
                </EventCard>,
            );

            expect(container.firstChild).toHaveClass(styles.highPriority);
        });
    });

    describe('Status Variants', () => {
        it('displays in-progress status', () => {
            render(
                <EventCard priority="normal">
                    <EventCard.Content>
                        <EventCard.Header
                            title={defaultProps.title}
                            onOptionsClick={() => {}}
                            priority="normal"
                            sourceDevice={defaultProps.sourceDevice}
                        />
                        <EventCard.Footer timestamp={defaultProps.timestamp} status="inProgress" />
                    </EventCard.Content>
                </EventCard>,
            );

            expect(screen.getByText('In-Progress')).toBeDefined();
        });
    });

    describe('Size Variants', () => {
        it('applies large size styles', () => {
            render(
                <EventCard priority="normal" size="large">
                    <EventCard.Content>
                        <EventCard.Header
                            title={defaultProps.title}
                            onOptionsClick={() => {}}
                            priority="normal"
                            sourceDevice={defaultProps.sourceDevice}
                        />
                    </EventCard.Content>
                </EventCard>,
            );

            const element = screen.getByText(defaultProps.title).closest(`.${styles.eventCard}`);
            expect(element?.className).toContain('_large_');
        });

        it('applies small size styles', () => {
            render(
                <EventCard priority="normal" size="small">
                    <EventCard.Content>
                        <EventCard.Header
                            title={defaultProps.title}
                            onOptionsClick={() => {}}
                            priority="normal"
                            sourceDevice={defaultProps.sourceDevice}
                        />
                    </EventCard.Content>
                </EventCard>,
            );

            const element = screen.getByText(defaultProps.title).closest(`.${styles.eventCard}`);
            expect(element?.className).toContain('_small_');
        });
    });

    describe('Interactions', () => {
        it('handles options click', () => {
            const onOptionsClick = vi.fn();
            render(
                <EventCard priority="normal" size="large">
                    <EventCard.Content>
                        <EventCard.Header
                            title={defaultProps.title}
                            onOptionsClick={onOptionsClick}
                            priority="normal"
                            sourceDevice={defaultProps.sourceDevice}
                        />
                    </EventCard.Content>
                </EventCard>,
            );

            const addNoteButton = screen.getByText('Add note');
            addNoteButton.click();
            expect(onOptionsClick).toHaveBeenCalled();
        });
    });
});
