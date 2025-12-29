import React from 'react';
import clsx from 'clsx';
import styles from './ListViewItem.module.scss';
import EventStatus, { EventStatusVariant } from '../EventStatus';
import EventInfo from '../EventInfo';
import VideoCamIcon from '../assets/video-cam.svg';
import LocationIcon from '../assets/location.svg';
import CriticalPriorityIcon from '../assets/critical-priority-icon.svg';
import HighPriorityIcon from '../assets/high-priority-icon.svg';
import fallbackImage from '../assets/fallback-image.png';
import Time from '../Time';

export type Priority = 'normal' | 'high' | 'critical';

export interface ListViewItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The image source for the item */
    imageSrc?: string;
    /** The title of the item */
    title: string;
    /** The status of the item */
    status: EventStatusVariant;
    /** The priority level of the item */
    priority?: Priority;
    /** The location or source of the item */
    location: string;
    /** The camera or source of the item */
    camera: string;
    /** The timestamp for the item */
    timestamp: string | Date;
    /** Function to call when the item is clicked */
    onClick: () => void;
}

/**
 * ListViewItem component provides a list view item with an image, title, status, priority, location, camera, and timestamp.
 *
 * ```
 * <ListViewItem
 *   imageSrc="https://example.com/image.jpg"
 *   title="Item 1"
 *   status="active"
 *   priority="high"
 *   location="Location 1"
 *   timestamp="2023-01-01T00:00:00.000Z"
 *   onClick={() => console.log('Item clicked')}
 * />
 * ```
 */
export const ListViewItem: React.FC<ListViewItemProps> = ({
    imageSrc,
    title,
    status,
    priority = 'normal',
    location,
    timestamp,
    className,
    camera,
    onClick,
    ...props
}) => {
    const [imageError, setImageError] = React.useState(false);

    const getPriorityIcon = (priority: Priority) => {
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
        <div
            className={clsx(styles.listViewItem, priority !== 'normal' && styles[`priority_${priority}`], className)}
            onClick={onClick}
            {...props}
        >
            <div className={styles.imageContainer}>
                {imageSrc && !imageError ? (
                    <img src={imageSrc} alt={title} className={styles.image} onError={() => setImageError(true)} />
                ) : (
                    <img src={fallbackImage} alt={title} className={styles.image} />
                )}
            </div>
            <div className={styles.mainContent}>
                <div className={styles.content}>
                    <EventInfo text={title} severity={priority} variant="title" icon={getPriorityIcon(priority)} />
                    <EventStatus status={status} className={styles.gridStatus} />
                    <EventInfo
                        text={camera}
                        severity={priority}
                        variant="body"
                        icon={<VideoCamIcon />}
                        iconPosition="left"
                    />
                    <EventInfo
                        text={location}
                        severity={priority}
                        variant="body"
                        icon={<LocationIcon />}
                        iconPosition="left"
                    />
                    <Time timestamp={timestamp} className={styles.gridTimestamp} />
                </div>
            </div>
        </div>
    );
};

export default ListViewItem;
