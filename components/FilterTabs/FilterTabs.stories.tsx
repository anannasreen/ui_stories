import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterTabs from '.';

const meta = {
    title: 'Components/FilterTabs',
    component: FilterTabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FilterTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: React.ComponentProps<typeof FilterTabs>) => {
    const [selected, setSelected] = useState(args.value);
    return <FilterTabs {...args} value={selected} onChange={setSelected} />;
};

export const Default: Story = {
    args: {
        value: 'all',
        items: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
        ],
        onChange: () => {},
    },
    render: Template,
};

export const WithCountBadges: Story = {
    args: {
        value: 'all',
        items: [
            { value: 'all', label: 'All', count: 42 },
            { value: 'active', label: 'Active', count: 24 },
            { value: 'completed', label: 'Completed', count: 18 },
        ],
        onChange: () => {},
    },
    render: Template,
};

export const WithCountBadgesAndDisabled: Story = {
    args: {
        value: 'all',
        items: [
            { value: 'all', label: 'All', count: 42 },
            { value: 'active', label: 'Active', count: 24, disabled: true },
            { value: 'completed', label: 'Completed', count: 18 },
        ],
        onChange: () => {},
    },
    render: Template,
};

export const WithDisabledTab: Story = {
    args: {
        value: 'all',
        items: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active', disabled: true },
            { value: 'completed', label: 'Completed' },
        ],
        onChange: () => {},
    },
    render: Template,
};

export const AllDisabled: Story = {
    args: {
        value: 'all',
        items: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
        ],
        disabled: true,
        onChange: () => {},
    },
    render: Template,
};
