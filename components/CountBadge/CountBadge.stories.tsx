import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CountBadge from '.';

const meta: Meta<typeof CountBadge> = {
    title: 'Components/CountBadge',
    component: CountBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CountBadge>;

export const Default: Story = {
    args: {
        count: 144325,
    },
};

export const WithIcon: Story = {
    args: {
        count: 3,
        icon: <span>🔔</span>,
    },
};

export const Hidden: Story = {
    args: {
        count: 0,
    },
};

export const CustomClassName: Story = {
    args: {
        count: 10,
        className: 'custom-badge',
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <CountBadge count={1} />
            <CountBadge count={99} />
            <CountBadge count={5} icon={<span>🔔</span>} />
        </div>
    ),
};

export const InteractiveExample: Story = {
    render: () => {
        const [count, setCount] = useState(0);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                <CountBadge count={count} icon={<span>📬</span>} />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setCount((prev) => Math.max(0, prev - 1))}>-</button>
                    <button onClick={() => setCount((prev) => prev + 1)}>+</button>
                </div>
            </div>
        );
    },
};
