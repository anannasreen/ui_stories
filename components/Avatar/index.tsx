import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import styles from './Avatar.module.scss';
import { Text } from '../Text';

export const variants = cva(styles.avatar, {
    variants: {
        size: {
            sm: styles.sizeSM,
            md: styles.sizeMD,
            lg: styles.sizeLG,
            xl: styles.sizeXL,
        },
    },
    defaultVariants: {
        size: 'xl',
    },
});

export interface AvatarProps extends VariantProps<typeof variants> {
    /** URL for the image */
    src?: string;
    /** Username to generate initial from when no image is provided */
    username: string;
    /** Optional className to override styles */
    className?: string;
}

/**
 * A React component that displays a user's profile image or their first initial in a styled container.
 * When no image is provided, it generates a unique background color based on the username for consistent visual representation.
 */
const Avatar: React.FC<AvatarProps> = ({ src, username, size, className }) => {
    const [imageError, setImageError] = useState(false);
    const hasImage = !!src && !imageError;
    const initials = username.trim().slice(0, 1).toUpperCase();

    const avatarClass = variants({ size, className });

    return (
        <>
            {hasImage ? (
                <img src={src} alt="profile image" className={avatarClass} onError={() => setImageError(true)} />
            ) : (
                <Text
                    className={clsx(avatarClass, styles.initialsContainer)}
                    aria-label={'avatar'}
                    variant="body-md-med"
                >
                    {initials}
                </Text>
            )}
        </>
    );
};

export default Avatar;
