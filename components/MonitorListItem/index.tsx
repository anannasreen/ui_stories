import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './MonitorListItem.module.scss';
import TimeAgo from 'react-timeago';
import EventStatus, { EventStatusVariant } from '../EventStatus';
import CriticalPriorityIcon from '../assets/monitorlist-critical-priority.svg';
import HighPriorityIcon from '../assets/monitorlist-high-priority.svg';
import { Text } from '../Text';
import EventInfo from '../EventInfo';
import fallbackImage from '../assets/fallback-image-small.png';
import { formatTime } from '@cobalt/ui/utils/format';
import { EventPriority } from '@cobalt/ui/types';
import { Link } from 'react-aria-components';

export const monitorListItemVariants = cva(styles.monitorListItem, {
    variants: {
        /** Priority of the event */
        priority: {
            normal: '',
            high: styles.high,
            critical: styles.critical,
        },
        /** Current state of the item */
        state: {
            unread: styles.unRead,
            read: '',
            selected: styles.selected,
        },
    },
    defaultVariants: {
        priority: 'normal',
        state: 'unread',
    },
});

export interface MonitorListItemProps extends VariantProps<typeof monitorListItemVariants> {
    /** Image URL for the event */
    image?: string;
    /** Title of the event */
    issueTitle: string;
    /** Camera location of the event */
    cameraLocation: string;
    /** Time of the event */
    time: string;
    /** Source Device of the event */
    sourceDevice: string;
    /** Status of the event */
    eventStatus: EventStatusVariant;
    /** Priority level of the event */
    priority?: EventPriority;
    /** Current state of the item */
    state: 'unread' | 'read' | 'selected';
    /** Navigation href for the item. */
    href: string;
}

/**
 * MonitorListItem component provides a list view item with an image, title, status, priority, location, camera, and timestamp.
 *
 * ```
 * <MonitorListItem
 *   image="https://example.com/image.jpg"
 *   issueTitle="Issue 1"
 *   cameraLocation="Location 1"
 *   time="2023-01-01T00:00:00.000Z"
 *   sourceDevice="Device 1"
 *   eventStatus="active"
 *   priority="high"
 *   state="unread"
 *   href="https://example.com"
 *   onClick={() => console.log('Item clicked')}
 * />
 * ```
 */
export const MonitorListItem: React.FC<MonitorListItemProps> = ({
    image,
    issueTitle,
    cameraLocation,
    time,
    sourceDevice,
    eventStatus,
    priority = 'normal',
    state = 'unread',
    href,
}) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(!!image);

    const getPriorityIcon = (priority: EventPriority) => {
        switch (priority) {
            case 'high':
                return <HighPriorityIcon data-testid="high-priority-icon" />;
            case 'critical':
                return <CriticalPriorityIcon data-testid="critical-priority-icon" />;
            default:
                return null;
        }
    };

    return (
        <Link href={href} className={monitorListItemVariants({ priority, state })} data-testid="monitor-list-item">
            <div className={styles.imageContainer} aria-label="event-image">
                {image && !imageError ? (
                    <img
                        src={image}
                        alt={issueTitle}
                        onError={() => setImageError(true)}
                        onLoad={() => setImageLoading(false)}
                        style={{ opacity: imageLoading ? 0 : 1 }}
                    />
                ) : (
                    <img src={fallbackImage} alt={issueTitle} />
                )}
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <EventInfo severity={priority} variant="title" text={issueTitle} icon={getPriorityIcon(priority)} />
                    <Text variant="body-sm-med" className={styles.timestamp} data-testid="monitor-time">
                        {formatTime(time, { hideTz: true, showMeridiem: true, relativeTo: time })}
                    </Text>
                </div>
                <div className={styles.content}>
                    <Text variant="body-sm-med" className={styles.location}>
                        {cameraLocation}
                    </Text>
                    <EventStatus status={eventStatus} />
                </div>
                <div className={styles.content}>
                    <Text variant="body-sm-regular" className={styles.camera}>
                        {sourceDevice}
                    </Text>
                    <Text variant="body-sm-regular" className={styles.updatedTime}>
                        <TimeAgo date={time} />
                    </Text>
                </div>
            </div>
        </Link>
    );
};

export default MonitorListItem;
