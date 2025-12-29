import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNotification, useNotificationStore } from './notifications';
import Notifications from '../components/notifications/store';

vi.mock('../components/notifications/store', () => ({
    default: {
        add: vi.fn((config) => 'mocked-id'),
        remove: vi.fn(),
    },
}));

describe('useNotification', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should add notification on mount and return id with remove function', () => {
        const mockNotification = { message: 'Test notification' };
        const { result } = renderHook(() => useNotification(mockNotification));

        const [id, removeNotification] = result.current;

        expect(id).toBe('mocked-id');
        expect(typeof removeNotification).toBe('function');
        expect(Notifications.add).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Test notification',
                id: 'mocked-id',
            }),
        );
    });

    it('should remove notification on unmount', () => {
        const mockNotification = { message: 'Test notification' };
        const { unmount } = renderHook(() => useNotification(mockNotification));

        unmount();

        expect(Notifications.remove).toHaveBeenCalledWith('mocked-id');
    });

    it('should remove notification when remove function is called', () => {
        const mockNotification = { message: 'Test notification' };
        const { result } = renderHook(() => useNotification(mockNotification));

        const [id, removeNotification] = result.current;
        act(() => {
            removeNotification();
        });

        expect(Notifications.remove).toHaveBeenCalledWith('mocked-id');
    });

    it('should update notification when config changes', () => {
        const initialNotification = { message: 'Initial message' };
        const { rerender } = renderHook((props) => useNotification(props), {
            initialProps: initialNotification,
        });

        expect(Notifications.add).toHaveBeenCalledWith(expect.objectContaining({ message: 'Initial message' }));

        const updatedNotification = { message: 'Updated message' };
        rerender(updatedNotification);

        expect(Notifications.add).toHaveBeenCalledWith(expect.objectContaining({ message: 'Updated message' }));
    });

    it('should maintain stable references when config is deeply equal', () => {
        const notification = { message: 'Test message' };
        const { result, rerender } = renderHook((props) => useNotification(props), { initialProps: notification });

        const [initialId, initialRemove] = result.current;

        rerender({ message: 'Test message' });
        const [nextId, nextRemove] = result.current;

        expect(nextId).toBe(initialId);
        expect(nextRemove).toBe(initialRemove);
    });
});

describe('useNotificationStore', () => {
    it('should return the Notifications store', () => {
        const { result } = renderHook(() => useNotificationStore());
        expect(result.current).toBe(Notifications);
    });
});
