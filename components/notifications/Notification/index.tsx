import React, { useEffect, useMemo } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { useNotification, useDeepValueEqualityMemo } from '../../../hooks';
import { NotificationConfig } from '../store';

/**
 * Props interface for the Notification component
 */
export interface Props extends NotificationConfig {
    /** Content to display within the notification */
    children?: React.ReactNode;
}

/**
 * A component for displaying notifications to the user.
 *
 * This component creates a notification based on the provided configuration
 * and automatically handles cleanup when the component unmounts.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import Notification from './Notification';
 *
 * function Example() {
 *   return (
 *     <Notification
 *       title="Success"
 *       message="Your action was completed successfully"
 *       type="success"
 *       insert="top"
 *       container="top-right"
 *     />
 *   );
 * }
 * ```
 */
export default function Notification({ children, ...etc }: Props) {
    const config = useDeepValueEqualityMemo(
        () =>
            ({
                ...etc,
                dismiss: etc.dismiss || { touch: false, click: false, showIcon: false },
            }) as NotificationConfig,
        [etc],
    );

    // avoid a deep equality check on children
    const configWithContent = useMemo(
        () => ({
            ...config,
            // the RNC typings are too strict here. We should be allowed to pass a ReactNode as well as a ReactElement
            content: <>{children}</>,
        }),
        [config, children],
    );

    const [_, removeNotification] = useNotification(children ? configWithContent : config);
    useEffect(() => removeNotification, [removeNotification]);

    return null;
}

/**
 * Root component for notifications system.
 *
 * This component must be included once in your application to enable the notification system.
 * Typically placed near the root of your application.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import { NotificationsRoot } from './Notification';
 *
 * function App() {
 *   return (
 *     <>
 *       <NotificationsRoot />
 *       <div>Your application content here</div>
 *     </>
 *   );
 * }
 * ```
 */
export function NotificationsRoot() {
    return <ReactNotifications />;
}
