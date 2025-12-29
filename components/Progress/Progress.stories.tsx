import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Progress from '.';

const meta: Meta<typeof Progress> = {
    title: 'Components/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
    args: {},
};

export const CustomSize: Story = {
    args: {
        size: '32px',
    },
};

export const CustomColor: Story = {
    args: {
        color: '#4CAF50',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '20px' }}>
                <Story />
            </div>
        ),
    ],
};

export const CustomDuration: Story = {
    args: {
        duration: '2s',
    },
};

export const Paused: Story = {
    args: {
        paused: true,
    },
};

export const MultipleVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Progress size="16px" />
            <Progress size="24px" color="#2196F3" />
            <Progress size="32px" color="#4CAF50" />
            <Progress size="40px" color="#F44336" />
        </div>
    ),
};
