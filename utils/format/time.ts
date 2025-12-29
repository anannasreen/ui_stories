import { parseISO, isValid, isSameDay } from 'date-fns';
import { format, formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { padStart } from 'lodash';

const DATE_FMT_STRING = 'MM/dd/yy';
const TIME_FMT_STRING = 'HH:mm:ss';
const TIME_FMT_STRING_WITH_MERIDIEM = 'hh:mm:ss a';

export interface FormatTimeOptions {
    /** Specify a timezone to show the time in. If ommitted, the user's local timezone will be used. */
    tz?: string;
    /** If the formatted datetime is on the same day as this one, the date will be ommitted. */
    relativeTo?: string | Date | null;
    /** Hide the timezone in the result. Good for places where the timezone is displayed separately for multiple values. */
    hideTz?: boolean;
    /** Hide the seconds in the result. Good for places where high time precision is not needed. */
    hideSecs?: boolean;
    /** Show time in 12-hour format with AM/PM */
    showMeridiem?: boolean;
}

/** Render a timestamp to the user.

    This helper formalizes timestamp rendering rules which we want to be consistent across all our UIs:
    * Dates are always formatted like this: 05/10/24
    * Times are formatted like this: 13:31:15
        * Unless high precision is not necessary, then the seconds can be hidden
    * Dates are always shown with the timestamp, unless they are on the same day as a contextual date rendered elsewhere in the UI
    * The rendered timezone is always shown with the timestamp, unless it's included elsewhere in the UI for multiple datetimes
    * The timezone used to render a datetime depends on the context, maintaining the intent of our existing timezone handling:
        * Times rendered to specialists use Pacific time to aid coordination
        * Times rendered to customers use the user's local timezone
        * Times rendered on an event detail view always use the site timezone
*/
export function formatTime(
    date: string | Date | null,
    { tz, relativeTo, hideTz = false, hideSecs = false, showMeridiem = false }: FormatTimeOptions = {},
): string {
    if (!date) return '';
    const invalidMsg = '[invalid date]';
    const parsed = tz ? toZonedTime(date, tz) : typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsed)) return invalidMsg;
    const parsedRelativeTo =
        relativeTo && tz
            ? toZonedTime(relativeTo, tz)
            : typeof relativeTo === 'string'
              ? parseISO(relativeTo)
              : relativeTo;

    // Ensure we're comparing dates relative to the requested timezone
    const showDate = !parsedRelativeTo || !isSameDay(parsed, parsedRelativeTo);
    const baseTimeFmt = showMeridiem ? TIME_FMT_STRING_WITH_MERIDIEM : TIME_FMT_STRING;
    const timeFmt = hideSecs ? baseTimeFmt.replace(':ss', '') : baseTimeFmt;
    let formatStr = showDate ? `${DATE_FMT_STRING} ${timeFmt}` : timeFmt;
    if (!hideTz) formatStr += ' z';

    try {
        return format(parsed, formatStr, { timeZone: tz });
    } catch (e) {
        return invalidMsg;
    }
}

/** Format a timezone for display to users. If none is provided, it will show the user's local timezone. */
export function formatTz(tz?: string) {
    return tz ? formatInTimeZone(new Date(), tz, 'z') : format(new Date(), 'z');
}

export function formatDuration(durationInSeconds: number, includeTrailing = false) {
    const hours = Math.floor(durationInSeconds / (60 * 60));
    const minutes = Math.floor((durationInSeconds / 60) % 60);
    const seconds = Math.round(durationInSeconds % 60);

    const segments: string[] = [];

    if (hours) {
        segments.push(`${hours}h`);
    }

    if (segments.length) {
        if (minutes || includeTrailing) segments.push(`${padStart(`${minutes}`, 2, '0')}m`);
    } else if (minutes) {
        segments.push(`${minutes}m`);
    }

    if (segments.length) {
        if (seconds || includeTrailing) segments.push(`${padStart(`${seconds}`, 2, '0')}s`);
    } else {
        // Always include this segment, with 0s as the fallback value
        segments.push(`${seconds}s`);
    }

    return segments.join(' ');
}

export function formatSeconds(s: number) {
    const hours = Math.floor(s / (60 * 60));
    const minutes = Math.floor((s / 60) % 60);
    const seconds = Math.round(s % 60);

    const segments: string[] = [];

    if (hours) {
        segments.push(hours.toString());
    }

    if (segments.length) {
        segments.push(padStart(`${minutes}`, 2, '0'));
    } else {
        segments.push(minutes.toString());
    }

    segments.push(padStart(`${seconds}`, 2, '0'));

    return segments.join(':');
}
