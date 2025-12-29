import { formatTime, formatDuration, formatTz, formatSeconds } from '.';

describe('formatTime', () => {
    test('Renders date only when different from context date, _in that timezone_', () => {
        expect(
            formatTime('2022-10-10T23:59:56.816359+00:00', {
                tz: 'America/Adak', // No DST
                relativeTo: '2022-10-11T00:01:56.816359+00:00',
            }),
        ).toBe('14:59:56 HADT');
        expect(
            formatTime('2022-10-10T08:59:56.816359+00:00', {
                tz: 'America/Adak', // No DST
                relativeTo: '2022-10-10T09:01:56.816359+00:00',
            }),
        ).toBe('10/09/22 23:59:56 HADT');
        expect(
            formatTime('2022-10-09T23:59:56.816359+00:00', {
                relativeTo: '2022-10-10T00:01:56.816359+00:00',
            }),
        ).toBe('10/09/22 23:59:56 UTC');
        expect(
            formatTime('2022-10-09T23:59:56.816359+00:00', {
                relativeTo: '2022-10-09T23:59:57.816359+00:00',
            }),
        ).toBe('23:59:56 UTC');
    });

    test("Renders time in user's timezone if none specified", () => {
        // User's timezone is UTC in jsdom
        expect(formatTime('2022-10-10T10:04:56.816359-04:00')).toBe('10/10/22 14:04:56 UTC');
    });
});

describe('formatTimezone', () => {
    test("Renders user's timezone if none specified", () => {
        expect(formatTz()).toBe('UTC');
    });
});

describe('formatDuration', () => {
    test('0s', () => expect(formatDuration(0)).toEqual('0s'));
    test('31s (rounded)', () => expect(formatDuration(30.6)).toEqual('31s'));
    test('60s', () => expect(formatDuration(60)).toEqual('1m'));
    test('1m 00s', () => expect(formatDuration(60, true)).toEqual('1m 00s'));
    test('1m 20s', () => expect(formatDuration(80)).toEqual('1m 20s'));
    test('1h', () => expect(formatDuration(3600)).toEqual('1h'));
    test('1h 00m 00s', () => expect(formatDuration(3600, true)).toEqual('1h 00m 00s'));
    test('1h 12m', () => expect(formatDuration(4320)).toEqual('1h 12m'));
    test('1h 12m 00s', () => expect(formatDuration(4320, true)).toEqual('1h 12m 00s'));
    test('1h 12m 01s', () => expect(formatDuration(4321)).toEqual('1h 12m 01s'));
    test('1h 15s', () => expect(formatDuration(3615)).toEqual('1h 15s'));
    test('1h 00m 15s', () => expect(formatDuration(3615, true)).toEqual('1h 00m 15s'));
});

describe('formatSeconds', () => {
    test('120s', () => expect(formatSeconds(120)).toEqual('2:00'));
    test('31s (rounded)', () => expect(formatSeconds(30.6)).toEqual('0:31'));
    test('1h 00m 15s', () => expect(formatSeconds(3615)).toEqual('1:00:15'));
});
