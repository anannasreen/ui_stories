import React, { ReactNode } from 'react';
import styles from './EventTimeline.module.scss';
import { Text } from '../Text';
import { Button, OverlayArrow, Tooltip, TooltipTrigger } from 'react-aria-components';
import RightCaretArrow from '@cobalt/ui/components/assets/right-caret-arrow.svg';
import { EventPriority } from '@cobalt/ui/types';
import { formatTime } from '@cobalt/ui/utils/format/time';
import clsx from 'clsx';

/**
 * Interface for a single event in the timeline.
 */
export interface TimelineEvent {
    /** Time of the event in format "HH:mm:ss" */
    timestamp: string;

    /** Title text for the event */
    title: string;

    /** SVG icon component to display */
    icon: ReactNode;

    /** Priority level affecting icon styling. Default: 'normal' */
    priority?: EventPriority;

    /** Optional image URL to show in popup when hovering */
    imageUrl?: string;

    /** Whether to show the meridiem (AM/PM) in the time display. Default: true */
    showMeridiem?: boolean;

    /** Timezone to display timestamps in. If not provided, local timezone is used. */
    timezone?: string;
}

interface TimelineEventProps extends TimelineEvent {
    /** Callback function triggered when hovering over an event */
    onMouseEnter?: (event: TimelineEvent) => void;
    /** Callback function triggered when mouse leaves an event */
    onMouseLeave?: (event: TimelineEvent) => void;
}

/**
 * TimelineEventItem component displays a single event in the timeline.
 *
 * ```tsx
 * <TimelineEventItem
 *   timestamp="2023-01-01T00:00:00Z"
 *   title="Event 1"
 *   icon={<DoorIcon />}
 *   priority="high"
 *   imageUrl="https://example.com/image.jpg"
 *   showMeridiem={true}
 *   timezone="UTC"
 *   onMouseEnter={() => {}}
 *   onMouseLeave={() => {}}
 * />
 * ```
 */
const TimelineEventItem = ({
    timestamp,
    title,
    icon,
    priority = 'normal',
    imageUrl,
    showMeridiem,
    timezone,
    onMouseEnter,
    onMouseLeave,
}: TimelineEventProps) => {
    const handleMouseEnter = () => {
        onMouseEnter?.({
            timestamp,
            title,
            icon,
            priority,
            imageUrl,
            showMeridiem,
            timezone,
        });
    };

    const handleMouseLeave = () => {
        onMouseLeave?.({
            timestamp,
            title,
            icon,
            priority,
            imageUrl,
            showMeridiem,
            timezone,
        });
    };

    const eventContent = (
        <>
            <div data-testid="event-icon" className={styles.icon}>
                {icon}
            </div>
            <div className={styles.eventTitleContainer}>
                <div
                    className={clsx(
                        styles.eventTitle,
                        priority === 'high' || (priority === 'critical' && styles[priority]),
                    )}
                >
                    <Text variant="body-sm-med" data-testid="current-time">
                        {formatTime(timestamp, {
                            hideTz: true,
                            showMeridiem,
                            relativeTo: timestamp,
                            tz: timezone,
                        })}
                    </Text>
                    <Text variant="body-sm-med" className={styles.description}>
                        {title}
                    </Text>
                </div>
            </div>
        </>
    );

    return (
        <div className={styles.eventItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {imageUrl ? (
                <TooltipTrigger delay={0}>
                    <Button
                        className={clsx(
                            styles.iconContainer,
                            priority === 'high' || (priority === 'critical' && styles[priority]),
                        )}
                        aria-label={`Show preview for ${title}`}
                    >
                        {eventContent}
                    </Button>
                    <Tooltip placement="left" offset={16} className={styles.imagePopup}>
                        <OverlayArrow>
                            <RightCaretArrow className={styles.arrow} />
                        </OverlayArrow>
                        <img src={imageUrl} alt={`Preview for ${title}`} loading="lazy" />
                    </Tooltip>
                </TooltipTrigger>
            ) : (
                <Button
                    className={clsx(
                        styles.iconContainer,
                        priority === 'high' || (priority === 'critical' && styles[priority]),
                    )}
                    aria-label={title}
                >
                    {eventContent}
                </Button>
            )}
            <div className={styles.line} />
        </div>
    );
};

interface EventTimelineProps {
    /** List of events to display in the timeline */
    events: TimelineEvent[];

    /** Optional CSS properties to apply to the timeline */
    style?: React.CSSProperties;

    /** Callback function triggered when hovering over an event */
    onEventMouseEnter?: (event: TimelineEvent) => void;
    onEventMouseLeave?: (event: TimelineEvent) => void;

    /** Whether to show the meridiem (AM/PM) in the time display. Default: true */
    showMeridiem?: boolean;

    /** Timezone to display timestamps in. If not provided, local timezone is used. */
    timezone?: string;
}

/**
 * EventTimeline component displays a timeline of events with icons and timestamps.
 *
 * ```tsx
 * <EventTimeline events={[
 *   { timestamp: '2023-01-01T00:00:00Z', title: 'Event 1', icon: <DoorIcon /> },
 *   { timestamp: '2023-01-01T01:00:00Z', title: 'Event 2', icon: <DoorIcon /> },
 * ]} />
 * ```
 */
export const EventTimeline: React.FC<EventTimelineProps> = ({
    events,
    style,
    onEventMouseEnter,
    onEventMouseLeave,
    showMeridiem,
    timezone,
}) => {
    const handleEventMouseEnter = (event: TimelineEvent) => {
        onEventMouseEnter?.(event);
    };

    const handleEventMouseLeave = (event: TimelineEvent) => {
        onEventMouseLeave?.(event);
    };

    return (
        <div className={styles.timeline} style={style}>
            <div className={styles.events}>
                {events.map((event, index) => (
                    <TimelineEventItem
                        key={`${event.timestamp}-${index}`}
                        {...event}
                        showMeridiem={showMeridiem}
                        timezone={timezone}
                        onMouseEnter={() => handleEventMouseEnter(event)}
                        onMouseLeave={() => handleEventMouseLeave(event)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventTimeline;
