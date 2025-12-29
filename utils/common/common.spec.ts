import { describe, expect, it } from 'vitest';
import { convertTimeOffsetToSeconds, getSliderTickPositions } from './common';

describe('getSliderTickPositions', () => {
    it('should return correct tick marks for a range', () => {
        const tickMarks = getSliderTickPositions(0, 10, 2);
        expect(tickMarks).toEqual([
            { tick: 0, tickPosition: 0 },
            { tick: 2, tickPosition: 20 },
            { tick: 4, tickPosition: 40 },
            { tick: 6, tickPosition: 60 },
            { tick: 8, tickPosition: 80 },
            { tick: 10, tickPosition: 100 },
        ]);
    });

    it('should handle step equal to the range', () => {
        const tickMarks = getSliderTickPositions(0, 10, 10);
        expect(tickMarks).toEqual([
            { tick: 0, tickPosition: 0 },
            { tick: 10, tickPosition: 100 },
        ]);
    });

    it('should handle a small range', () => {
        const tickMarks = getSliderTickPositions(1, 3, 1);
        expect(tickMarks).toEqual([
            { tick: 1, tickPosition: 0 },
            { tick: 2, tickPosition: 50 },
            { tick: 3, tickPosition: 100 },
        ]);
    });

    it('should return empty array if min > max', () => {
        const result = getSliderTickPositions(10, 0, 2);
        expect(result).toEqual([]);
    });
});

describe('convertTimeOffsetToSeconds', () => {
    describe('valid formats', () => {
        it('converts seconds only (SS)', () => {
            expect(convertTimeOffsetToSeconds('0')).toBe(0);
            expect(convertTimeOffsetToSeconds('30')).toBe(30);
            expect(convertTimeOffsetToSeconds('59')).toBe(59);
        });

        it('converts minutes and seconds (MM:SS)', () => {
            expect(convertTimeOffsetToSeconds('0:00')).toBe(0);
            expect(convertTimeOffsetToSeconds('1:30')).toBe(90);
            expect(convertTimeOffsetToSeconds('59:59')).toBe(3599);
        });

        it('converts hours, minutes and seconds (HH:MM:SS)', () => {
            expect(convertTimeOffsetToSeconds('0:00:00')).toBe(0);
            expect(convertTimeOffsetToSeconds('1:00:00')).toBe(3600);
            expect(convertTimeOffsetToSeconds('1:30:45')).toBe(5445);
            expect(convertTimeOffsetToSeconds('29:59:59')).toBe(107999);
        });
    });

    describe('input validation', () => {
        it('handles whitespace', () => {
            expect(convertTimeOffsetToSeconds(' 30 ')).toBe(30);
            expect(convertTimeOffsetToSeconds(' 1:30 ')).toBe(90);
            expect(convertTimeOffsetToSeconds('1:30:45 ')).toBe(5445);
        });

        it('rejects non-string or empty input', () => {
            const errorMsg = 'Invalid input: timeOffset must be a non-empty string';
            const undefinedInput: string = undefined as any;
            const nullInput: string = null as any;
            expect(() => convertTimeOffsetToSeconds(undefinedInput)).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds(nullInput)).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('')).toThrow(errorMsg);
        });

        it('rejects invalid time units', () => {
            const errorMsg = 'Invalid format: Time units must be non-negative and less than 60';
            expect(() => convertTimeOffsetToSeconds('60')).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('1:60')).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('-1')).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('1:-1')).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('invalid')).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('abc:def')).toThrow(errorMsg);
        });

        it('rejects too many time components', () => {
            const errorMsg = 'Invalid format: Use SS, MM:SS, or HH:MM:SS';
            expect(() => convertTimeOffsetToSeconds('1:2:3:4')).toThrow(errorMsg);
            expect(() => convertTimeOffsetToSeconds('1:2:3:4:5')).toThrow(errorMsg);
        });
    });
});
