import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScaleOnChange } from './hooks';

describe('useScaleOnChange', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('initializes with scale of 1', () => {
        const { result } = renderHook(() => useScaleOnChange(5));
        expect(result.current.get()).toBe(1);
    });

    it('does not scale when value is undefined', () => {
        const { result } = renderHook(() => useScaleOnChange(undefined));
        expect(result.current.get()).toBe(1);
    });

    it('does not scale when value remains the same', () => {
        const { result, rerender } = renderHook(({ value }) => useScaleOnChange(value), {
            initialProps: { value: 5 },
        });

        rerender({ value: 5 });
        expect(result.current.get()).toBe(1);
    });

    it('scales up and back when value changes', () => {
        const { result, rerender } = renderHook(({ value }) => useScaleOnChange(value), {
            initialProps: { value: 5 },
        });

        expect(result.current.get()).toBe(1);

        rerender({ value: 6 });
        expect(result.current.get()).toBe(1.1);

        vi.advanceTimersByTime(112);
        expect(result.current.get()).toBe(1);
    });

    it('uses custom scale value when provided', () => {
        const { result, rerender } = renderHook(({ value }) => useScaleOnChange(value, { scaleTo: 1.5 }), {
            initialProps: { value: 5 },
        });

        rerender({ value: 6 });
        expect(result.current.get()).toBe(1.5);
    });

    it('uses custom duration when provided', () => {
        const { result, rerender } = renderHook(({ value }) => useScaleOnChange(value, { durationMs: 500 }), {
            initialProps: { value: 5 },
        });

        rerender({ value: 6 });
        expect(result.current.get()).toBe(1.1);

        vi.advanceTimersByTime(249);
        expect(result.current.get()).toBe(1.1);

        vi.advanceTimersByTime(1);
        expect(result.current.get()).toBe(1);
    });

    it('cleans up timeout on unmount', () => {
        const { result, rerender, unmount } = renderHook(({ value }) => useScaleOnChange(value), {
            initialProps: { value: 5 },
        });

        rerender({ value: 6 });
        unmount();

        vi.runAllTimers();
    });

    it('handles rapid value changes', () => {
        const { result, rerender } = renderHook(({ value }) => useScaleOnChange(value), {
            initialProps: { value: 5 },
        });

        rerender({ value: 6 });
        expect(result.current.get()).toBe(1.1);

        rerender({ value: 7 });
        expect(result.current.get()).toBe(1.1);

        vi.advanceTimersByTime(112);
        expect(result.current.get()).toBe(1);
    });
});
