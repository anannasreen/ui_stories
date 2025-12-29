import { useState, useEffect, useMemo, useCallback } from 'react';
import Notifications, { NotificationConfig } from '../components/notifications/store';
import { useDeepValueEqualityMemo } from './useValueEqualityMemo';

export const useNotification = (notification: NotificationConfig) => {
    const [id, setId] = useState<string | undefined>(notification.id);
    const stableConfig = useDeepValueEqualityMemo(() => ({ id, ...notification }), [notification, id]);

    useEffect(() => {
        // addNotification modifies the object IN PLACE... 💀
        const newId = Notifications.add(stableConfig);
        setId(newId);

        return () => {
            Notifications.remove(newId);
        };
    }, [stableConfig]);

    const removeNotification = useCallback(() => {
        if (id) {
            Notifications.remove(id);
        }
    }, [id]);

    return useMemo(() => [id, removeNotification] as const, [id, removeNotification]);
};

export const useNotificationStore = () => Notifications;
