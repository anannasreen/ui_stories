import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useInterval, useLastValue } from './index';

describe('useInterval', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('should call callback immediately and then on interval when enabled', () => {
        const callback = vi.fn();
        renderHook(() => useInterval(callback, 1000, true));

        expect(callback).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(2);

        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(callback).toHaveBeenCalledTimes(4);
    });

    it('should not call callback when disabled', () => {
        const callback = vi.fn();
        renderHook(() => useInterval(callback, 1000, false));

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        expect(callback).not.toHaveBeenCalled();
    });

    it('should clear interval on unmount', () => {
        const callback = vi.fn();
        const { unmount } = renderHook(() => useInterval(callback, 1000, true));

        expect(callback).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(2);

        unmount();

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should handle interval changes', () => {
        const callback = vi.fn();
        const { rerender } = renderHook(({ interval }) => useInterval(callback, interval, true), {
            initialProps: { interval: 1000 },
        });

        expect(callback).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(2);

        rerender({ interval: 500 });

        expect(callback).toHaveBeenCalledTimes(3);

        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(callback).toHaveBeenCalledTimes(4);
    });
});

describe('useLastValue', () => {
    it('should return undefined on first render', () => {
        const { result } = renderHook(() => useLastValue('initial'));
        expect(result.current).toBeUndefined();
    });

    it('should return previous value after update', () => {
        const { result, rerender } = renderHook(({ value }) => useLastValue(value), {
            initialProps: { value: 'initial' },
        });

        expect(result.current).toBeUndefined();

        rerender({ value: 'updated' });
        expect(result.current).toBe('initial');

        rerender({ value: 'final' });
        expect(result.current).toBe('updated');
    });

    it('should handle different value types', () => {
        type TestValue = number | { test: string } | number[];
        const { result, rerender } = renderHook(({ value }: { value: TestValue }) => useLastValue(value), {
            initialProps: { value: 42 as TestValue },
        });

        expect(result.current).toBeUndefined();

        rerender({ value: 100 as TestValue });
        expect(result.current as number).toBe(42);

        const obj = { test: 'value' } as TestValue;
        rerender({ value: obj });
        expect(result.current as number).toBe(100);

        const arr = [1, 2, 3] as TestValue;
        rerender({ value: arr });
        expect(result.current).toBe(obj);
    });

    it('should maintain reference equality for object values', () => {
        const initialObj = { test: 'value' };
        const { result, rerender } = renderHook(({ value }) => useLastValue(value), {
            initialProps: { value: initialObj },
        });

        const newObj = { test: 'new value' };
        rerender({ value: newObj });

        expect(result.current).toBe(initialObj);
    });
});
