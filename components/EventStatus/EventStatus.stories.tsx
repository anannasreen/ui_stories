import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import EventStatus from '.';

const meta: Meta<typeof EventStatus> = {
    title: 'Components/EventStatus',
    component: EventStatus,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventStatus>;

export const open: Story = {
    args: {
        status: 'open',
    },
};

export const OnHold: Story = {
    args: {
        status: 'onHold',
    },
};

export const InProgress: Story = {
    args: {
        status: 'inProgress',
    },
};

export const resolved: Story = {
    args: {
        status: 'resolved',
    },
};

export const AllStatuses: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <EventStatus status={'open'} />
            <EventStatus status={'onHold'} />
            <EventStatus status={'inProgress'} />
            <EventStatus status={'resolved'} />
        </div>
    ),
};
