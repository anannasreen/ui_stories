import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import { useCheckMounted } from './useCheckMounted';

describe('useCheckMounted', () => {
    it('should return a stable callback', () => {
        const { result, rerender } = renderHook(() => useCheckMounted());
        const initialCallback = result.current;

        rerender();
        expect(result.current).toBe(initialCallback);
    });

    it('should return true when component is mounted', () => {
        const { result } = renderHook(() => useCheckMounted());
        expect(result.current()).toBe(true);
    });

    it('should return false after component is unmounted', () => {
        const { result, unmount } = renderHook(() => useCheckMounted());
        expect(result.current()).toBe(true);

        unmount();
        expect(result.current()).toBe(false);
    });

    it('should maintain correct mounted state through multiple renders', () => {
        const { result, rerender } = renderHook(() => useCheckMounted());
        expect(result.current()).toBe(true);

        rerender();
        expect(result.current()).toBe(true);

        rerender();
        expect(result.current()).toBe(true);
    });

    it('should handle rapid mount/unmount cycles', () => {
        const { result, unmount, rerender } = renderHook(() => useCheckMounted());
        expect(result.current()).toBe(true);

        rerender();
        expect(result.current()).toBe(true);

        unmount();
        expect(result.current()).toBe(false);

        const { result: newResult } = renderHook(() => useCheckMounted());
        expect(newResult.current()).toBe(true);
    });
});
