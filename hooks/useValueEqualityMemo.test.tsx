import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { useDeepValueEqualityMemo, useShallowValueEqualityMemo } from './useValueEqualityMemo';

describe('useDeepValueEqualityMemo', () => {
    it('should return initial value', () => {
        const factory = () => ({ foo: 'bar' });
        const { result } = renderHook(() => useDeepValueEqualityMemo(factory, [{ foo: 'bar' }]));
        expect(result.current).toEqual({ foo: 'bar' });
    });

    it('should not recompute when deps are deeply equal', () => {
        const factory = vi.fn(() => ({ foo: 'bar' }));
        const { result } = renderHook(() => useDeepValueEqualityMemo(factory, [{ foo: 'bar' }]));

        expect(factory).toHaveBeenCalled();
        const initialValue = result.current;

        act(() => {
            renderHook(() => useDeepValueEqualityMemo(factory, [{ foo: 'bar' }]));
        });

        expect(factory).toHaveBeenCalled();
        expect(result.current).toBe(initialValue);
    });

    it('should recompute when deps change deeply', () => {
        const factory = vi.fn(() => ({ foo: 'bar' }));

        act(() => {
            renderHook(() => useDeepValueEqualityMemo(factory, [{ foo: 'baz' }]));
        });

        expect(factory).toHaveBeenCalled();
    });
});

describe('useShallowValueEqualityMemo', () => {
    it('should return initial value', () => {
        const factory = () => ({ foo: 'bar' });
        const { result } = renderHook(() => useShallowValueEqualityMemo(factory, [['bar']]));
        expect(result.current).toEqual({ foo: 'bar' });
    });

    it('should recompute when array contents change by reference', () => {
        const factory = vi.fn(() => ({ foo: 'bar' }));

        act(() => {
            renderHook(() => useShallowValueEqualityMemo(factory, [[{ foo: 'bar' }]]));
        });

        expect(factory).toHaveBeenCalled();
    });

    it('should not recompute for primitive values that are equal', () => {
        const factory = vi.fn(() => 'result');
        const { result } = renderHook(() => useShallowValueEqualityMemo(factory, ['test']));

        expect(factory).toHaveBeenCalled();
        const initialValue = result.current;

        act(() => {
            renderHook(() => useShallowValueEqualityMemo(factory, ['test']));
        });

        expect(factory).toHaveBeenCalledTimes(2);
        expect(result.current).toBe(initialValue);
    });
});
