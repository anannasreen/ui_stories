import React from 'react';
import { Portal } from '../Portal';
import css from './FullScreen.module.scss';

type FullScreenProps = {
    /** Whether the component is in full-screen mode */
    isFullScreen?: boolean;
};

/**
 * FullScreen component provides a portal for full-screen content.
 *
 * ```
 * <FullScreen isFullScreen={true}>
 *   <div>Full-screen content</div>
 * </FullScreen>
 * ```
 */
export const FullScreen: React.FC<FullScreenProps> = ({ isFullScreen = false, children }) =>
    isFullScreen ? (
        <Portal>
            <div className={css.root}>{children}</div>
        </Portal>
    ) : (
        <>{children}</>
    );
