import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import WarningIcon from '../../stories/assets/warning-icon.svg';
import ErrorIcon from '../../stories/assets/error-icon.svg';
import VideoCamIcon from '../../stories/assets/video-cam.svg';
import EventInfo from './index';

const meta: Meta<typeof EventInfo> = {
    title: 'Components/EventInfo',
    component: EventInfo,
    argTypes: {
        severity: {
            control: {
                type: 'select',
                options: ['normal', 'critical', 'high'],
            },
            description: 'Severity level of the details',
        },
        icon: {
            control: {
                type: 'object',
            },
            description: 'Icon to display in the details',
        },
        variant: {
            control: {
                type: 'select',
                options: ['title', 'body'],
            },
            description: 'Visual variant of the event info',
        },
        muted: {
            control: 'boolean',
            description: 'Whether the event info is in muted state',
        },
        iconPosition: {
            control: {
                type: 'radio',
                options: ['left', 'right'],
            },
            defaultValue: 'right',
            description: 'Position of the icon',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventInfo>;

// Basic examples with different variants
export const Title: Story = {
    args: {
        variant: 'title',
        text: 'Tailgating Alert',
        icon: <VideoCamIcon />,
    },
};

export const Body: Story = {
    args: {
        variant: 'body',
        text: 'Person detected in restricted area',
        icon: <WarningIcon />,
        severity: 'high',
    },
};

export const MutedState: Story = {
    args: {
        text: 'Person detected in restricted area',
        icon: <WarningIcon />,
        muted: true,
        severity: 'high',
    },
};

// Severity examples
export const CriticalSeverity: Story = {
    args: {
        severity: 'critical',
        variant: 'body',
        text: 'Critical system error detected',
        icon: <ErrorIcon />,
    },
};

export const HighSeverity: Story = {
    args: {
        severity: 'high',
        variant: 'body',
        text: 'High priority alert',
        icon: <WarningIcon />,
    },
};

// Icon Position examples
export const LeftIconPosition: Story = {
    args: {
        variant: 'body',
        text: 'Icon on the left side',
        icon: <VideoCamIcon />,
        iconPosition: 'left',
    },
};

export const RightIconPosition: Story = {
    args: {
        variant: 'body',
        text: 'Icon on the right side',
        icon: <VideoCamIcon />,
        iconPosition: 'right',
    },
};
