import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Time from '.';

const meta = {
    title: 'Components/Time',
    component: Time,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        timestamp: {
            control: 'text',
            description: 'ISO timestamp string to display',
            table: {
                type: { summary: 'string' },
            },
        },
        variant: {
            control: { type: 'select' },
            options: ['dark', 'light', 'muted'],
            description: 'The visual style variant',
            table: {
                type: { summary: "'dark' | 'light' | 'muted'" },
                defaultValue: { summary: 'dark' },
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 'var(--spacing-4x)' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Time>;

export default meta;
type Story = StoryObj<typeof Time>;

export const Dark: Story = {
    args: {
        timestamp: '2025-02-06T12:36:43',
        variant: 'dark',
    },
};

export const Light: Story = {
    args: {
        timestamp: '2025-02-06T12:36:43',
        variant: 'light',
    },
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [{ name: 'dark', value: 'var(--surface-secondary-deepest)' }],
        },
    },
};

export const Muted: Story = {
    args: {
        timestamp: '2025-02-06T12:36:43',
        variant: 'muted',
    },
};

export const CurrentTime: Story = {
    args: {
        timestamp: new Date().toISOString(),
        variant: 'dark',
    },
};

export const AllVariants: Story = {
    render: () => {
        const timestamp = '2025-02-06T12:36:43';
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Time timestamp={timestamp} variant="dark" />
                <div style={{ padding: '1rem' }}>
                    <Time timestamp={timestamp} variant="light" />
                </div>
                <Time timestamp={timestamp} variant="muted" />
            </div>
        );
    },
};
