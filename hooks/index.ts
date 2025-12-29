import { useEffect, useRef } from 'react';

export * from './notifications';
export * from './useCheckMounted';
export * from './useValueEqualityMemo';

/** Helper for running a task on an interval in React components.

    The interval will be stopped/started on the basis of the enabled argument, and
    the callback will be invoked every time the interval starts (but not when it starts).

    Make sure to memoize the callback with useCallback so it isn't called too frequently!
*/
export function useInterval(callback: () => void, intervalMs: number, enabled = true) {
    useEffect(() => {
        if (!enabled) return;
        callback();
        const interval = setInterval(callback, intervalMs);
        return () => clearInterval(interval);
    }, [callback, enabled, intervalMs]);
}

export function useLastValue<T>(value: T): T | undefined {
    const history = useRef<T | undefined>();
    useEffect(() => {
        history.current = value;
    }, [value]);

    const lastValue = history.current;
    return lastValue;
}
