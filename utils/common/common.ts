export const getSliderTickPositions = (min: number, max: number, step: number) => {
    const tickMarks = [];
    for (let tick = min; tick <= max; tick += step) {
        const tickPosition = ((tick - min) / (max - min)) * 100;
        tickMarks.push({ tick, tickPosition });
    }

    return tickMarks;
};

/**
 * Converts a time offset to total seconds.
 * Formats: SS, MM:SS, or HH:MM:SS
 * Examples: "30" → 30s, "45:00" → 45m, "01:30:45" → 1h 30m 45s
 */
export const convertTimeOffsetToSeconds = (timeOffset: string): number => {
    // Handle invalid inputs
    if (!timeOffset?.trim()) {
        throw new Error('Invalid input: timeOffset must be a non-empty string');
    }

    const parsedTimeUnits = timeOffset
        .trim()
        .split(':')
        .map((unit) => {
            const value = parseInt(unit, 10);
            if (isNaN(value)) {
                throw new Error('Invalid format: Time units must be non-negative and less than 60');
            }
            return value;
        });

    // Check for too many segments
    if (parsedTimeUnits.length > 3) {
        throw new Error('Invalid format: Use SS, MM:SS, or HH:MM:SS');
    }

    // Pad with zeros and extract time units
    const [hours = 0, minutes = 0, seconds = 0] = [...Array(3 - parsedTimeUnits.length).fill(0), ...parsedTimeUnits];

    // Validate minutes and seconds are within valid range (0-59)
    if (minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
        throw new Error('Invalid format: Time units must be non-negative and less than 60');
    }

    // Validate hours is non-negative
    if (hours < 0) {
        throw new Error('Invalid format: Hours must be non-negative');
    }

    return hours * 3600 + minutes * 60 + seconds;
};
