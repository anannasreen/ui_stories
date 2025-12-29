import React, { useContext } from 'react';
import styles from './EventCard.module.scss';
import EventStatus, { EventStatusVariant } from '../EventStatus';
import Time from '../Time';
import EventInfo from '../EventInfo';
import Button from '../Button';
import { FiPlus } from 'react-icons/fi';
import { TimelineEvent, VideoPlayer } from '../VideoPlayer';
import CriticalPriorityIcon from '../assets/critical-priority-icon.svg';
import HighPriorityIcon from '../assets/high-priority-icon.svg';
import VideoCamIcon from '../assets/video-cam.svg';
import LocationIcon from '../assets/location.svg';
import { Text } from '../Text';
import { EventPriority } from '@cobalt/ui/types';
import clsx from 'clsx';

export interface EventCardContextType {
    /** Priority of the event */
    priority: EventPriority;
    /** Size of the event card */
    size: 'small' | 'large';
}

export const EventCardContext = React.createContext<EventCardContextType>({
    priority: 'normal',
    size: 'large',
});

export interface EventCardProps {
    /** Priority of the event */
    priority: EventPriority;
    /** Size of the event card */
    size?: 'small' | 'large';
    /** Children components */
    children: React.ReactNode;
    /** Additional class name */
    className?: string;
}

export interface EventCardVideoProps {
    /** Source URL of the video */
    videoSrc: string;
    /** Start time of the video */
    startTime: string;
    /** End time of the video */
    endTime: string;
    /** Events associated with the video */
    events?: TimelineEvent[];
}

export interface EventCardHeaderProps {
    /** Title of the event */
    title: string;
    /** Callback when options button is clicked */
    onOptionsClick?: () => void;
    /** Priority level of the event */
    priority?: EventPriority;
    /** Source device that triggered the event */
    sourceDevice?: string;
}

export interface EventCardFooterProps {
    /** Time when the event occurred */
    timestamp: string | Date;
    /** Status of the event */
    status: EventStatusVariant;
}

export interface EventCardDetailsProps {
    /** Location of the event */
    location: string;
    /** Additional information about the event */
    additionalInfo: string;
}

export interface EventCardDescriptionProps {
    /** Child components */
    children: React.ReactNode;
}

export interface EventCardContentProps {
    /** Child components */
    children: React.ReactNode;
}

/**
 * Helper function to get the appropriate priority icon based on event priority
 */
const getPriorityIcon = (priority?: EventPriority) => {
    switch (priority) {
        case 'high':
            return <HighPriorityIcon data-testid="high-priority-icon" />;
        case 'critical':
            return <CriticalPriorityIcon data-testid="critical-priority-icon" />;
        default:
            return null;
    }
};

/**
 * EventCard is a compound component for displaying event information with various sections.
 * It supports different priorities and sizes, and can be composed with several subcomponents.
 *
 * @example
 * ```tsx
 * // Basic usage with essential information
 * <EventCard priority="normal">
 *   <EventCard.Header
 *     title="Door Access"
 *     sourceDevice="Front Camera"
 *   />
 *   <EventCard.Content>
 *     <EventCard.Video
 *       videoSrc="https://example.com/video.mp4"
 *       startTime="2023-05-01T12:00:00"
 *       endTime="2023-05-01T12:01:00"
 *     />
 *     <EventCard.Details
 *       location="Main Entrance"
 *       additionalInfo="Person identified: John Doe"
 *     />
 *   </EventCard.Content>
 *   <EventCard.Footer
 *     timestamp="2023-05-01T12:00:00"
 *     status="resolved"
 *   />
 * </EventCard>
 *
 * // Compact view with high priority
 * <EventCard priority="high" size="small">
 *   <EventCard.Header title="Intrusion Alert" />
 *   <EventCard.Content>
 *     <EventCard.Video
 *       videoSrc="https://example.com/video.mp4"
 *       startTime="2023-05-01T12:00:00"
 *       endTime="2023-05-01T12:01:00"
 *     />
 *   </EventCard.Content>
 * </EventCard>
 * ```
 */
function EventCard({ children, priority = 'normal', size = 'large', className }: EventCardProps) {
    return (
        <EventCardContext.Provider value={{ priority, size }}>
            <div
                className={clsx(
                    className,
                    styles.eventCard,
                    priority === 'critical' && styles.criticalPriority,
                    priority === 'high' && styles.highPriority,
                    styles[size],
                )}
            >
                {children}
            </div>
        </EventCardContext.Provider>
    );
}

/**
 * Header component for EventCard, displaying the title, source device, and action button.
 *
 * @example
 * ```tsx
 * <EventCard.Header
 *   title="Motion Detected"
 *   sourceDevice="Hallway Camera"
 *   priority="high"
 *   onOptionsClick={() => alert('Options clicked')}
 * />
 * ```
 */
function EventCardHeader({ title, onOptionsClick, priority, sourceDevice }: EventCardHeaderProps) {
    const { size } = useContext(EventCardContext);

    return (
        <div className={styles.header}>
            <div className={styles.titleRow}>
                <EventInfo text={title} variant="title" icon={getPriorityIcon(priority)} />
                <EventInfo text={sourceDevice} variant="body" icon={<VideoCamIcon />} iconPosition="left" />
            </div>
            {size === 'large' && (
                <Button
                    variant="outline"
                    size="small"
                    icon={<FiPlus />}
                    onClick={onOptionsClick}
                    className={styles.button}
                    aria-label="Add note"
                >
                    Add note
                </Button>
            )}
        </div>
    );
}

/**
 * Video component for EventCard, displaying a video player with timeline events.
 *
 * @example
 * ```tsx
 * <EventCard.Video
 *   videoSrc="https://example.com/video.mp4"
 *   startTime="2023-05-01T12:00:00"
 *   endTime="2023-05-01T12:01:00"
 *   events={[{ time: "2023-05-01T12:00:30", label: "Motion detected" }]}
 * />
 * ```
 */
function EventCardVideo({ videoSrc, startTime, endTime, events = [] }: EventCardVideoProps) {
    const { size } = useContext(EventCardContext);

    return (
        <div className={styles.thumbnail}>
            <VideoPlayer
                videoUrl={videoSrc}
                videoStartTime={startTime}
                videoEndTime={endTime}
                showFullscreenButton={size === 'large'}
                showTimestamps={size === 'large'}
                events={size === 'large' ? events : []}
            />
        </div>
    );
}

/**
 * Details component for EventCard, displaying location and additional information.
 *
 * @example
 * ```tsx
 * <EventCard.Details
 *   location="Main Entrance"
 *   additionalInfo="Person identified: John Doe"
 * />
 * ```
 */
function EventCardDetails({ location, additionalInfo }: EventCardDetailsProps) {
    return (
        <div className={styles.details}>
            <EventInfo text={location} variant="body" icon={<LocationIcon />} iconPosition="left" />

            <Text variant="body-sm-med" className={styles.additionalInfo}>
                {additionalInfo}
            </Text>
        </div>
    );
}

/**
 * Footer component for EventCard, displaying timestamp and event status.
 *
 * @example
 * ```tsx
 * <EventCard.Footer
 *   timestamp="2023-05-01T12:00:00"
 *   status="resolved"
 * />
 * ```
 */
function EventCardFooter({ timestamp, status }: EventCardFooterProps) {
    return (
        <div className={styles.footer}>
            <Time timestamp={timestamp} variant="dark" />
            <EventStatus status={status} />
        </div>
    );
}

/**
 * Content component for EventCard, providing a container for card contents.
 *
 * @example
 * ```tsx
 * <EventCard.Content>
 *   <EventCard.Video {...videoProps} />
 *   <EventCard.Details {...detailsProps} />
 * </EventCard.Content>
 * ```
 */
function EventCardContent({ children }: EventCardContentProps) {
    return <div className={styles.content}>{children}</div>;
}

/**
 * Description component for EventCard, only displayed in large size.
 *
 * @example
 * ```tsx
 * <EventCard.Description>
 *   <p>Additional description text can go here...</p>
 * </EventCard.Description>
 * ```
 */
function EventCardDescription({ children }: EventCardDescriptionProps) {
    const { size } = useContext(EventCardContext);

    if (size !== 'large') {
        return null;
    }

    return <div>{children}</div>;
}

// Attach subcomponents to main component
EventCard.Header = EventCardHeader;
EventCard.Footer = EventCardFooter;
EventCard.Video = EventCardVideo;
EventCard.Content = EventCardContent;
EventCard.Details = EventCardDetails;
EventCard.Description = EventCardDescription;

export { EventCard };
