import { describe, it, expect, vi, beforeEach } from 'vitest';
import Notifications from './store';
import { Store } from 'react-notifications-component';
import type { iTransition } from 'react-notifications-component';

vi.mock('react-notifications-component', () => ({
    Store: {
        addNotification: vi.fn((config) => 'test-id'),
        removeNotification: vi.fn(),
        removeAllNotifications: vi.fn(),
    },
}));

describe('Notifications Store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('add', () => {
        it('should add notification with default container', () => {
            const config = { message: 'Test notification' };
            const id = Notifications.add(config);

            expect(id).toBe('test-id');
            expect(Store.addNotification).toHaveBeenCalledWith(
                expect.objectContaining({
                    container: 'top-right',
                    message: 'Test notification',
                    animationIn: ['animate__animated', 'animate__fadeInRight animate__faster'],
                    animationOut: ['animate__animated', 'animate__fadeOutRight animate__faster', 'zombie_fix'],
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
                }),
            );
        });

        it('should use custom container when provided', () => {
            const config = {
                message: 'Test notification',
                container: 'bottom-left',
            };
            Notifications.add(config);

            expect(Store.addNotification).toHaveBeenCalledWith(
                expect.objectContaining({
                    container: 'bottom-left',
                    message: 'Test notification',
                }),
            );
        });

        it('should merge custom animation config with defaults', () => {
            const customTransition: iTransition = {
                duration: 300,
                timingFunction: 'ease-out',
                delay: 0,
            };

            const config = {
                message: 'Test notification',
                animationIn: ['custom-animation'],
                slidingEnter: customTransition,
            };
            Notifications.add(config);

            expect(Store.addNotification).toHaveBeenCalledWith(
                expect.objectContaining({
                    animationIn: ['custom-animation'],
                    slidingEnter: customTransition,
                }),
            );
        });
    });

    describe('remove', () => {
        it('should remove notification by id', () => {
            const id = 'test-notification-id';
            Notifications.remove(id);

            expect(Store.removeNotification).toHaveBeenCalledWith(id);
        });
    });

    describe('removeAll', () => {
        it('should remove all notifications', () => {
            Notifications.removeAll();

            expect(Store.removeAllNotifications).toHaveBeenCalled();
        });
    });
});
