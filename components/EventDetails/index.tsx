import React, { ReactNode } from 'react';
import { Text } from '../Text';
import styles from './EventDetails.module.scss';

interface EventDetailsProps {
    /** A title for the event details section */
    title: string;
    /** The section's contents */
    children: ReactNode;
}

/**
 * EventDetails component displays a section with a title and description.
 * Used for displaying a labeled section of information in a consistent format.
 *
 * @example
 * ```tsx
 * // Basic usage with text content
 * <EventDetails title="Event Details">
 *   Event description goes here...
 * </EventDetails>
 *
 * // With nested components
 * <EventDetails title="Location">
 *   <div>
 *     <p>Building: Main Campus</p>
 *     <p>Floor: 3</p>
 *   </div>
 * </EventDetails>
 * ```
 */
export default function EventDetails({ title, children }: EventDetailsProps): JSX.Element {
    return (
        <section className={styles.section}>
            <Text variant="body-sm-md-upper-case" className={styles.title}>
                {title}
            </Text>

            <Text variant="body-sm-med" className={styles.description}>
                {children}
            </Text>
        </section>
    );
}
