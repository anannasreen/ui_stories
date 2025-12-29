import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PillsList, PillItem } from '.';

const meta = {
    title: 'Components/Inputs/PillsList',
    component: PillsList,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A versatile component for displaying items as interactive pills. Supports various states including default, disabled, read-only, and destructive states.',
            },
        },
    },
    argTypes: {
        items: {
            description: 'Array of items to display as pills',
            control: 'object',
        },
        onDelete: {
            description: 'Callback when delete button is clicked',
            control: false,
        },
        disabled: {
            description: 'Whether the pills are disabled',
            control: 'boolean',
        },
        readOnly: {
            description: 'Whether the pills are read-only (no delete button)',
            control: 'boolean',
        },
        destructive: {
            description: 'Whether to show the pills in a destructive state',
            control: 'boolean',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PillsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialItems: PillItem[] = [
    { id: '1', label: 'React' },
    { id: '2', label: 'TypeScript' },
    { id: '3', label: 'JavaScript' },
    { id: '4', label: 'This is a very long pill label that will be truncated' },
];

export const Default: Story = {
    args: {
        items: initialItems,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default pills with delete functionality.',
            },
        },
    },
};

const InteractivePillsList = () => {
    const [items, setItems] = useState(initialItems);

    const handleDelete = (item: PillItem, index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return <PillsList items={items} onDelete={handleDelete} />;
};

export const Interactive: Story = {
    render: () => <InteractivePillsList />,
    parameters: {
        docs: {
            description: {
                story: 'Interactive example where pills can be deleted.',
            },
        },
    },
};

export const ReadOnly: Story = {
    args: {
        items: initialItems,
        readOnly: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Read-only state where delete buttons are hidden.',
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        items: initialItems,
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled state where pills and delete buttons are non-interactive.',
            },
        },
    },
};

export const Destructive: Story = {
    args: {
        items: initialItems,
        destructive: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Destructive state with red styling, useful for indicating destructive actions.',
            },
        },
    },
};

const InteractiveDestructivePillsList = () => {
    const [items, setItems] = useState(initialItems);

    const handleDelete = (item: PillItem, index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return <PillsList items={items} onDelete={handleDelete} destructive />;
};

export const DestructiveInteractive: Story = {
    render: () => <InteractiveDestructivePillsList />,
    parameters: {
        docs: {
            description: {
                story: 'Interactive example with destructive styling where pills can be deleted.',
            },
        },
    },
};
