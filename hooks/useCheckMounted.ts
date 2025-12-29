import { useCallback, useEffect, useRef } from 'react';

export function useCheckMounted() {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    return useCallback(() => mounted.current, []);
}
