import { differenceInSeconds } from 'date-fns';
import React, { useEffect, useState } from 'react';

type CountdownProps = {
    /** Target date to count down to */
    to: Date;
};

/**
 * Countdown component displays a timer counting down to a specified date.
 *
 * ```tsx
 * // Counts down to 5 minutes from now
 * const targetDate = new Date(Date.now() + 5 * 60 * 1000);
 * <Countdown to={targetDate} />
 * ```
 */
export function Countdown({ to }: CountdownProps) {
    const [totalSeconds, setTotalSeconds] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            const secondsLeft = differenceInSeconds(to, new Date());
            if (secondsLeft < 0) {
                clearInterval(interval);
            } else {
                setTotalSeconds(Math.round(secondsLeft));
            }
        }, 1000);

        setTotalSeconds(differenceInSeconds(to, new Date()));

        return () => clearInterval(interval);
    }, [to]);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <>
            {minutes}:{seconds.toString().padStart(2, '0')}
        </>
    );
}
