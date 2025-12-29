import React from 'react';
import styles from './ProfileInfo.module.scss';
import { Text } from '../Text';
import Avatar from '../Avatar';

interface ProfileInfoProps {
    /** Name of the user */
    name: string;
    /** Email of the user */
    email: string;
    /** Source of the user's profile image */
    imageSrc?: string;
    /** Whether to show the name and email details */
    showDetails?: boolean;
}

/**
 * ProfileInfo component displays a user's profile image and optional name and email.
 * Combines an avatar with user details in a consistent layout.
 *
 * @example
 * ```tsx
 * // Standard display with details
 * <ProfileInfo
 *   name="John Doe"
 *   email="john.doe@example.com"
 *   imageSrc="https://example.com/image.jpg"
 * />
 *
 * // Avatar-only display (no name/email)
 * <ProfileInfo
 *   name="John Doe"
 *   email="john.doe@example.com"
 *   imageSrc="https://example.com/image.jpg"
 *   showDetails={false}
 * />
 * ```
 */
export default function ProfileInfo({ name, email, imageSrc, showDetails = true }: ProfileInfoProps) {
    return (
        <div className={styles.container}>
            <Avatar src={imageSrc} size={showDetails ? 'xl' : 'md'} username={name} />
            {showDetails && (
                <div className={styles.info}>
                    <Text variant="body-lg-bold" className={styles.name}>
                        {name}
                    </Text>
                    <Text variant="body-md-med" className={styles.email}>
                        {email}
                    </Text>
                </div>
            )}
        </div>
    );
}
