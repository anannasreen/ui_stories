import clsx from 'clsx';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from './ExternalLink.module.scss';

export type Props = React.HTMLProps<HTMLAnchorElement>;

/**
 * A simple link/anchor component for displaying external links.
 * Opens in a new tab (i.e. `target=_blank`) by default.
 */
export default function ExternalLink({ target = '_blank', rel = 'noreferrer', className, children, ...props }: Props) {
    return (
        <a target={target} rel={rel} {...props} className={clsx(styles.externalLink, className)}>
            <FaExternalLinkAlt />
            <span>{children}</span>
        </a>
    );
}
