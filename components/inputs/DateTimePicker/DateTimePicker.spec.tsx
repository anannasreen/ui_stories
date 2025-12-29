import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { format } from 'date-fns';
import { INPUT_DATE_FORMAT, DateTimePicker } from '.';

const inputLabel = 'Test Label';
const now = new Date();
const TestHarness = ({ min, max, startingDate }: { min?: Date; max?: Date; startingDate?: Date }) => {
    const [date, setDate] = React.useState(startingDate || now);
    const onChange = (newDate: Date) => {
        setDate(newDate);
    };
    console.log('date', format(date, INPUT_DATE_FORMAT));
    return (
        <div>
            <DateTimePicker min={min} max={max} onChange={onChange} value={date} label={inputLabel} />
        </div>
    );
};

describe('<DateTimePicker />', () => {
    it('defaults to now', async () => {
        render(<TestHarness />);
        const input = screen.getByLabelText(inputLabel);
        expect(input).toHaveValue(format(now, INPUT_DATE_FORMAT));
        fireEvent.change(input, { target: { value: '2024-11-08T19:17:33' } });
        expect(input).toHaveValue('2024-11-08T19:17');
    });

    it('respects min prop', async () => {
        render(<TestHarness startingDate={new Date('2024-12-01T00:00')} min={new Date('2024-12-01T00:00')} />);
        const input = screen.getByLabelText(inputLabel);
        fireEvent.change(input, { target: { value: '2024-11-08T19:17:33' } });
        expect(input).toHaveValue('2024-12-01T00:00');
    });

    it('respects max prop', async () => {
        render(<TestHarness startingDate={new Date('2024-12-01T00:00')} max={new Date('2024-12-01T00:00')} />);
        const input = screen.getByLabelText(inputLabel);
        fireEvent.change(input, { target: { value: '2024-12-08T19:17:33' } });
        expect(input).toHaveValue('2024-12-01T00:00');
    });
});
