import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';
import { useLastValue } from '../../hooks';

interface UseScaleOnChangeConfig {
    durationMs?: number;
    scaleTo?: number;
}

export const useScaleOnChange = <T>(value?: T, { durationMs = 225, scaleTo = 1.1 }: UseScaleOnChangeConfig = {}) => {
    const scale = useMotionValue(1);
    const prevValue = useLastValue(value);

    useEffect(() => {
        if (!value || !prevValue) return;
        if (value === prevValue) return;

        scale.set(scaleTo);

        const timeout = setTimeout(() => {
            scale.set(1);
        }, durationMs / 2);

        return () => clearTimeout(timeout);
    }, [scale, value, prevValue, scaleTo, durationMs]);

    return scale;
};
