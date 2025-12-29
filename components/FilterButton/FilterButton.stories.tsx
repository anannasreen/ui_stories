import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterButton from './index';
import { FaFilter } from 'react-icons/fa';

const meta: Meta<typeof FilterButton> = {
    title: 'Components/FilterButton',
    component: FilterButton,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        isActive: { control: 'boolean' },
        disabled: { control: 'boolean' },
        onClick: { action: 'clicked' },
        className: { control: 'text' },
        icon: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

export const Default: Story = {
    args: {
        label: 'Filter',
    },
};

export const WithIcon: Story = {
    args: {
        label: 'Filter',
        icon: <FaFilter />,
    },
};

export const Active: Story = {
    args: {
        label: 'Active Filter',
        isActive: true,
        icon: <FaFilter />,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Filter',
        disabled: true,
        icon: <FaFilter />,
    },
};
