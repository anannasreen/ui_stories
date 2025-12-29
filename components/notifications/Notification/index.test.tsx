import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Notification, { Props } from './index';
import { useNotification, useDeepValueEqualityMemo } from '../../../hooks';

vi.mock('../../../hooks', () => ({
    useNotification: vi.fn(() => ['mocked-id', vi.fn()]),
    useDeepValueEqualityMemo: vi.fn((factory) => factory()),
}));

describe('Notification', () => {
    const mockRemove = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNotification as jest.Mock).mockImplementation(() => ['mocked-id', mockRemove]);
    });

    it('should render nothing and set up notification with basic config', () => {
        const config: Props = {
            message: 'Test notification',
            type: 'success',
        };

        const { container } = render(<Notification {...config} />);
        expect(container.firstChild).toBeNull();
        expect(useNotification).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Test notification',
                type: 'success',
                dismiss: { touch: false, click: false, showIcon: false },
            }),
        );
    });

    it('should use custom dismiss config when provided', () => {
        const config: Props = {
            message: 'Test notification',
            dismiss: { touch: true, click: true, showIcon: true, duration: 5000 },
        };

        render(<Notification {...config} />);
        expect(useNotification).toHaveBeenCalled();
    });

    it('should include children in notification content when provided', () => {
        const config: Props = { message: 'Test notification' };
        const childContent = 'Child content';

        render(
            <Notification {...config}>
                <div>{childContent}</div>
            </Notification>,
        );

        expect(useNotification).toHaveBeenCalledWith(
            expect.objectContaining({
                content: expect.any(Object),
            }),
        );
    });

    it('should remove notification on unmount', () => {
        const config: Props = { message: 'Test notification' };
        const { unmount } = render(<Notification {...config} />);

        unmount();
        expect(mockRemove).toHaveBeenCalled();
    });

    it('should update notification when props change', () => {
        const initialConfig: Props = { message: 'Initial message' };
        const { rerender } = render(<Notification {...initialConfig} />);

        const updatedConfig: Props = { message: 'Updated message' };
        rerender(<Notification {...updatedConfig} />);

        expect(useNotification).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Updated message',
            }),
        );
    });

    it('should maintain stable references for deeply equal configs', () => {
        const config: Props = { message: 'Test message' };
        const { rerender } = render(<Notification {...config} />);

        rerender(<Notification message="Test message" />);

        const calls = (useDeepValueEqualityMemo as jest.Mock).mock.calls;
        expect(calls[0][1]).toEqual(calls[1][1]);
    });
});
