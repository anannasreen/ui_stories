import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import EventDetails from '.';
import { Divider } from '../Divider/Divider';

const meta: Meta<typeof EventDetails> = {
    title: 'Components/EventDetails',
    component: EventDetails,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventDetails>;

export const Default: Story = {
    render: () => (
        <EventDetails title="DESCRIPTION">
            Unauthorized person tailgating through San Francisco Office without badge swipe
        </EventDetails>
    ),
};

export const WithDivider: Story = {
    render: () => (
        <>
            <EventDetails title="DESCRIPTION">
                Unauthorized person tailgating through San Francisco Office without badge swipe
            </EventDetails>
            <Divider />
            <EventDetails title="Location of Events">Building A - San Francisco Office(North)</EventDetails>
        </>
    ),
};

export const MultipleEventDetailss: Story = {
    render: () => (
        <>
            <EventDetails title="Event Type">Security Breach</EventDetails>
            <Divider />
            <EventDetails title="Description">
                Unauthorized person tailgating through San Francisco Office without badge swipe
            </EventDetails>
            <Divider />
            <EventDetails title="Location of Events">Building A - San Francisco Office(North)</EventDetails>
            <Divider />
            <EventDetails title="Location">415 Mission St San Francisco CA 911450</EventDetails>
            <Divider />
            <EventDetails title="Time Cards">No authorized cards detected during events</EventDetails>
        </>
    ),
};
