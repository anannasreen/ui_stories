import React from 'react';
import styles from './Container.module.scss';

type ContainerProps = React.HTMLProps<HTMLDivElement>;

/**
 * A simple layout container component that applies consistent styling
 *
 * The Container component provides a standardized way to wrap content
 * with appropriate spacing and styling across the application.
 *
 * ```tsx
 * <Container className="custom-class">
 *   <h1>Content Title</h1>
 *   <p>Container content goes here</p>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => (
    <div className={`${styles.root} ${className || ''}`} {...props}>
        {children}
    </div>
);
