import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FiList, FiGrid } from 'react-icons/fi';
import { Key } from 'react-aria-components';
import Group from './Group';
import { MultiToggle } from '..';

const meta: Meta<typeof Group> = {
    title: 'Components/Inputs/MultiToggle',
    component: Group,
    argTypes: {
        orientation: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
            description: 'The orientation of the toggle group',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: 'horizontal' },
            },
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the toggle group is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Group>;

// Basic example with view toggle
export const ViewToggle: Story = {
    args: {
        orientation: 'horizontal',
    },
    render: (args) => {
        const [selectedView, setSelectedView] = React.useState<Set<Key>>(new Set(['list']));

        const handleSelectionChange = (keys: Set<Key>) => {
            // If the user tries to deselect all items, do nothing
            if (keys.size === 0) return;

            // Otherwise update the selection
            setSelectedView(keys);
        };

        return (
            <MultiToggle.Group {...args} selectedKeys={selectedView} onSelectionChange={handleSelectionChange}>
                <MultiToggle.Option id="list" icon={<FiList />} />
                <MultiToggle.Option id="grid" icon={<FiGrid />} />
            </MultiToggle.Group>
        );
    },
};

// Vertical orientation
export const VerticalViewToggle: Story = {
    args: {
        orientation: 'vertical',
    },
    render: (args) => {
        const [selectedView, setSelectedView] = React.useState<Set<Key>>(new Set(['list']));

        const handleSelectionChange = (keys: Set<Key>) => {
            // If the user tries to deselect all items, do nothing
            if (keys.size === 0) return;

            // Otherwise update the selection
            setSelectedView(keys);
        };

        return (
            <MultiToggle.Group {...args} selectedKeys={selectedView} onSelectionChange={handleSelectionChange}>
                <MultiToggle.Option id="list" icon={<FiList />} />
                <MultiToggle.Option id="grid" icon={<FiGrid />} />
            </MultiToggle.Group>
        );
    },
};
