import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from '.';
import { addDays, addYears, subDays } from 'date-fns';

const meta: Meta<typeof DateTimePicker> = {
    title: 'Components/Inputs/DateTimePicker',
    component: DateTimePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

const currentDate = new Date();

// Interactive wrapper component
const InteractiveDateTimePicker = (args: React.ComponentProps<typeof DateTimePicker>) => {
    const [date, setDate] = useState(args.value);

    return (
        <DateTimePicker
            {...args}
            value={date}
            onChange={(newValue, e) => {
                setDate(newValue);
                args.onChange?.(newValue, e);
            }}
        />
    );
};

export const Default: Story = {
    args: {
        value: currentDate,
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <InteractiveDateTimePicker {...args} label={'Start date'} />
            <InteractiveDateTimePicker {...args} label={'End date'} />
        </div>
    ),
};

export const WithMinMax: Story = {
    args: {
        label: 'Date with Range',
        value: currentDate,
        min: subDays(currentDate, 7),
        max: addDays(currentDate, 7),
    },
    render: (args) => <InteractiveDateTimePicker {...args} />,
};

export const CustomWidth: Story = {
    args: {
        label: 'Custom Width',
        value: currentDate,
        width: '300px',
    },
    render: (args) => <InteractiveDateTimePicker {...args} />,
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Picker',
        value: currentDate,
        disabled: true,
    },
    render: (args) => <InteractiveDateTimePicker {...args} />,
};

export const States: Story = {
    render: () => {
        const now = new Date();
        const [date, setDate] = useState(now);
        return (
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <DateTimePicker label="Default" value={date} onChange={(newValue) => setDate(newValue)} />
                <DateTimePicker
                    label="With Min/Max"
                    value={date}
                    min={subDays(now, 7)}
                    max={addDays(now, 7)}
                    onChange={(newValue) => setDate(newValue)}
                />
                <DateTimePicker
                    label="Future Date Range"
                    value={date}
                    min={now}
                    max={addYears(now, 1)}
                    onChange={(newValue) => setDate(newValue)}
                />
                <DateTimePicker label="Disabled" value={now} disabled onChange={() => {}} />
            </div>
        );
    },
};
