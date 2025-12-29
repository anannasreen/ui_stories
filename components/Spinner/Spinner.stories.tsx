import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '.';

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {},
};

export const CustomSize: Story = {
    args: {
        size: 32,
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

export const WithTitle: Story = {
    args: {
        title: 'Loading...',
    },
};

export const MultipleSpinners: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Spinner size={16} />
            <Spinner size={24} color="#2196F3" />
            <Spinner size={32} color="#4CAF50" />
            <Spinner size={40} color="#F44336" />
        </div>
    ),
};

export const CustomStyling: Story = {
    args: {
        className: 'custom-spinner',
        style: {
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
        },
    },
};

export const InContext: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <button style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Spinner size={16} />
                Loading...
            </button>
        </div>
    ),
};
