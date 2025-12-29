import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Countdown } from './Countdown';
import { addMinutes } from 'date-fns';

const meta: Meta<typeof Countdown> = {
    title: 'Components/Countdown',
    component: Countdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        to: {
            description: 'Target date and time for the countdown',
            control: 'date',
            table: {
                type: { summary: 'Date' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Countdown>;

// Helper function to get a future date
const getFutureDate = (minutesToAdd: number) => addMinutes(new Date(), minutesToAdd);

export const Default: Story = {
    args: {
        to: getFutureDate(5), // 5 minutes from now
    },
};

export const ShortCountdown: Story = {
    args: {
        to: getFutureDate(1), // 1 minute from now
    },
};

export const LongCountdown: Story = {
    args: {
        to: getFutureDate(60), // 1 hour from now
    },
};

export const MultipleCountdowns: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                1 Minute: <Countdown to={getFutureDate(1)} />
            </div>
            <div>
                5 Minutes: <Countdown to={getFutureDate(5)} />
            </div>
            <div>
                15 Minutes: <Countdown to={getFutureDate(15)} />
            </div>
        </div>
    ),
};

export const WithLabels: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                Meeting starts in: <Countdown to={getFutureDate(30)} />
            </div>
            <div>
                Time remaining: <Countdown to={getFutureDate(10)} />
            </div>
            <div>
                Session expires in: <Countdown to={getFutureDate(5)} />
            </div>
        </div>
    ),
};
