import { iNotification, Store } from 'react-notifications-component';
import 'animate.css';
import './theme.scss';

export type NotificationConfig = MakeOptional<iNotification, 'container'>;

const Notifications = {
    add({ container, ...etc }: NotificationConfig) {
        return Store.addNotification({
            // Default values
            // The container generally shouldn't be customized on a per-notification basis.
            // Rather, you can target the top-right container and move it to a different area on a per-page basis
            // (see RobotScreen for an example).
            container: container || 'top-right',
            animationIn: ['animate__animated', 'animate__fadeInRight animate__faster'],
            animationOut: ['animate__animated', 'animate__fadeOutRight animate__faster', 'zombie_fix'],
            // Chosen to complement duration of animate__faster speed above (500ms)
            slidingEnter: {
                duration: 200,
                timingFunction: 'ease-in-out',
                delay: 0,
            },
            slidingExit: {
                duration: 200,
                timingFunction: 'ease-in-out',
                delay: 300,
            },
            // User-requested values
            ...etc,
        });
    },
    remove(id: string) {
        return Store.removeNotification(id);
    },
    removeAll() {
        return Store.removeAllNotifications();
    },
};

export default Notifications;
