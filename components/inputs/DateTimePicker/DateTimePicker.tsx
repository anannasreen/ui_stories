import React, { ChangeEvent, ReactNode, useRef } from 'react';
import { nanoid } from 'nanoid';
import { addYears, format, isAfter, isBefore, isSameDay, parseISO } from 'date-fns';
import { TextInputProps } from '../TextInput/TextInput';
import FormGroup from '../FormGroup';
import css from './DateTimePicker.module.scss';

/** Format used for the datetime-local input */
export const INPUT_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

interface DateTimeInputProps extends Omit<TextInputProps, 'value' | 'label' | 'onChange' | 'type' | 'min' | 'max'> {
    /** A label for the input. */
    label?: ReactNode;
    /** Current date and time value */
    value: Date;
    /** Callback function when date/time changes */
    onChange: (newValue: Date, e: ChangeEvent<HTMLInputElement>) => void;
    /** Width of the input field */
    width?: string;
    /** Minimum allowed date (defaults to 2016-01-01) */
    min?: Date;
    /** Maximum allowed date (defaults to one year from now) */
    max?: Date;
}

/**
 * DateTimePicker component provides a native datetime picker input with customizable min/max bounds.
 * Automatically constrains date selection between 2016-01-01 and one year from now by default.
 *
 * ```
 * <DateTimePicker
 *   label="Event Date & Time"
 *   value={eventDateTime}
 *   onChange={setEventDateTime}
 *   min={new Date()}
 * />
 * ```
 */
export function DateTimePicker({ label, value, onChange, id = nanoid(), width, min, max, ...etc }: DateTimeInputProps) {
    const style = width ? { width } : {};
    const inputRef = useRef<HTMLInputElement>(null);

    // The range of possible dates relevant to Cobalt
    const maxPossibleDate = addYears(new Date(), 1);
    const minPossibleDate = parseISO('2016-01-01T00:00:00');

    const maxOrMaxPossible = max || maxPossibleDate;
    const minOrMinPossible = min || minPossibleDate;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if (
            (isAfter(newDate, minOrMinPossible) || isSameDay(newDate, minOrMinPossible)) &&
            (isBefore(newDate, maxOrMaxPossible) || isSameDay(newDate, maxOrMaxPossible))
        ) {
            onChange(newDate, e);
        }
    };

    return (
        <FormGroup id={id} label={label} style={style} className={css.container} focusOnClick>
            <input
                ref={inputRef}
                id={id}
                value={format(value, INPUT_DATE_FORMAT)}
                type="datetime-local"
                className={`${css.datepickerInput} theme`}
                onChange={onChangeHandler}
                max={format(maxOrMaxPossible, INPUT_DATE_FORMAT)}
                min={format(minOrMinPossible, INPUT_DATE_FORMAT)}
                {...etc}
            />
        </FormGroup>
    );
}
