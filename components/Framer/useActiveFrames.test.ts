import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useActiveFrames from './useActiveFrames';
import { FrameType } from './types';

describe('useActiveFrames', () => {
    const createTestFrame = (color: string, width: number, priority?: number): FrameType => ({
        color,
        width,
        priority,
        renderTag: () => null,
    });

    beforeEach(() => {
        vi.useFakeTimers();
        act(() => {
            const { result } = renderHook(() => useActiveFrames());
            result.current.currentFrames.forEach((frame) => {
                result.current.api(frame.id, null);
            });
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes with empty frames and inactive state', () => {
        const { result } = renderHook(() => useActiveFrames());

        expect(result.current.currentFrames).toEqual([]);
        expect(result.current.isActive).toBe(false);
    });

    it('creates a new frame', () => {
        const { result } = renderHook(() => useActiveFrames());
        const testFrame = createTestFrame('red', 100);

        act(() => {
            result.current.api('test-id', testFrame);
        });

        expect(result.current.currentFrames).toHaveLength(1);
        expect(result.current.currentFrames[0]).toEqual({
            id: 'test-id',
            ...testFrame,
        });
        expect(result.current.isActive).toBe(true);
    });

    it('updates an existing frame', () => {
        const { result } = renderHook(() => useActiveFrames());
        const initialFrame = createTestFrame('red', 100);
        const updatedFrame = createTestFrame('blue', 200);

        act(() => {
            result.current.api('test-id', initialFrame);
        });

        act(() => {
            result.current.api('test-id', updatedFrame);
        });

        expect(result.current.currentFrames).toHaveLength(1);
        expect(result.current.currentFrames[0]).toEqual({
            id: 'test-id',
            ...updatedFrame,
        });
    });

    it('deletes a frame', () => {
        const { result } = renderHook(() => useActiveFrames());
        const testFrame = createTestFrame('red', 100);

        act(() => {
            result.current.api('test-id', testFrame);
        });

        act(() => {
            result.current.api('test-id', null);
            result.current.safeToDeactivate();
        });

        expect(result.current.currentFrames).toHaveLength(0);
        expect(result.current.isActive).toBe(false);
    });

    it('handles multiple frames with priority ordering', () => {
        const { result } = renderHook(() => useActiveFrames());
        const frame1 = createTestFrame('red', 100, 2);
        const frame2 = createTestFrame('blue', 200, 1);
        const frame3 = createTestFrame('green', 300, 3);

        act(() => {
            result.current.api('frame1', frame1);
            result.current.api('frame2', frame2);
            result.current.api('frame3', frame3);
        });

        expect(result.current.currentFrames).toHaveLength(3);
        expect(result.current.currentFrames[0].color).toBe('blue');
        expect(result.current.currentFrames[1].color).toBe('red');
        expect(result.current.currentFrames[2].color).toBe('green');
    });

    it('handles frames without priority', () => {
        const { result } = renderHook(() => useActiveFrames());
        const frame1 = createTestFrame('red', 100, 1);
        const frame2 = createTestFrame('blue', 200);
        const frame3 = createTestFrame('green', 300);

        act(() => {
            result.current.api('frame1', frame1);
            result.current.api('frame2', frame2);
            result.current.api('frame3', frame3);
        });

        expect(result.current.currentFrames).toHaveLength(3);
        expect(result.current.currentFrames[0].color).toBe('red');
        expect(result.current.currentFrames[1].color).toBe('blue');
        expect(result.current.currentFrames[2].color).toBe('green');
    });

    it('updates frame priority correctly', () => {
        const { result } = renderHook(() => useActiveFrames());
        const frame1 = createTestFrame('blue', 200, 1);
        const frame2 = createTestFrame('red', 100, 2);

        act(() => {
            result.current.api('frame1', frame1);
            result.current.api('frame2', frame2);
        });

        const updatedFrame2 = createTestFrame('red', 100, 0);
        act(() => {
            result.current.api('frame2', updatedFrame2);
        });

        expect(result.current.currentFrames[0].id).toBe('frame2');
        expect(result.current.currentFrames[1].id).toBe('frame1');
    });

    it('handles safe deactivation for single frame', () => {
        const { result } = renderHook(() => useActiveFrames());
        const testFrame = createTestFrame('red', 100);

        act(() => {
            result.current.api('test-id', testFrame);
        });

        act(() => {
            result.current.api('test-id', null);
            result.current.safeToDeactivate();
        });

        expect(result.current.currentFrames).toHaveLength(0);
        expect(result.current.isActive).toBe(false);
    });

    it('queues deletion for multiple frames', () => {
        const { result, rerender } = renderHook(() => useActiveFrames());

        act(() => {
            result.current.api('frame1', createTestFrame('red', 100));
            result.current.api('frame2', createTestFrame('blue', 200));
        });

        act(() => {
            result.current.api('frame1', null);
        });

        act(() => {
            vi.runAllTimers();
            rerender();
        });

        expect(result.current.currentFrames).toHaveLength(1);
        expect(result.current.currentFrames[0].id).toBe('frame2');
        expect(result.current.isActive).toBe(true);
    });
});
