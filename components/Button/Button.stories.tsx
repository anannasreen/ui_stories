import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { FiPlus, FiEdit } from 'react-icons/fi';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        controls: { expanded: true },
    },
    argTypes: {
        color: {
            control: {
                type: 'select',
            },
            options: ['primary', 'secondary', 'destructive', 'success'],
            description: 'The color scheme of the button',
            table: {
                type: {
                    summary: "'primary' | 'secondary' | 'destructive' | 'success'",
                },
                defaultValue: { summary: 'primary' },
            },
        },
        variant: {
            control: {
                type: 'select',
            },
            options: ['default', 'outline', 'ghost'],
            description: 'The visual style of the button',
            table: {
                type: {
                    summary: "'default' | 'outline' | 'ghost'",
                },
                defaultValue: { summary: 'default' },
            },
        },
        size: {
            control: {
                type: 'select',
            },
            options: ['medium', 'small', 'xs'],
            description: 'The size of the button',
            table: {
                defaultValue: { summary: 'medium' },
            },
        },
        iconPosition: {
            control: {
                type: 'select',
                options: ['start', 'end'],
            },
            defaultValue: 'start',
        },
        disabled: {
            control: 'boolean',
        },
        iconOnly: {
            control: 'boolean',
        },
        rounded: {
            control: 'boolean',
        },
        fullscreen: {
            control: 'boolean',
            description: 'Whether the button should take up the full width of its container',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Default Button',
    },
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="destructive">Destructive</Button>
            <Button color="success">Success</Button>
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button size="medium">Medium</Button>
            <Button size="small">Small</Button>
            <Button size="xs">XS</Button>
        </div>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button icon={<FiPlus />}>Icon Start</Button>
            <Button icon={<FiEdit />} iconPosition="end">
                Icon End
            </Button>
        </div>
    ),
};

export const IconOnly: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button icon={<FiPlus />} iconOnly />
            <Button icon={<FiPlus />} iconOnly rounded />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
                Disabled Outline
            </Button>
            <Button variant="ghost" disabled>
                Disabled Ghost
            </Button>
        </div>
    ),
};

export const ColorVariantMatrix: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '10px' }}>
            <Button color="primary" variant="default" icon={<FiPlus />}>
                Primary Default
            </Button>
            <Button color="primary" variant="outline" icon={<FiPlus />}>
                Primary Outline
            </Button>
            <Button color="primary" variant="ghost" icon={<FiPlus />}>
                Primary Ghost
            </Button>

            <Button color="secondary" variant="default" icon={<FiPlus />}>
                Secondary Default
            </Button>
            <Button color="secondary" variant="outline" icon={<FiPlus />}>
                Secondary Outline
            </Button>
            <Button color="secondary" variant="ghost" icon={<FiPlus />}>
                Secondary Ghost
            </Button>

            <Button color="destructive" variant="default" icon={<FiPlus />}>
                Destructive Default
            </Button>
            <Button color="destructive" variant="outline" icon={<FiPlus />}>
                Destructive Outline
            </Button>
            <Button color="destructive" variant="ghost" icon={<FiPlus />}>
                Destructive Ghost
            </Button>

            <Button color="success" variant="default" icon={<FiPlus />}>
                Success Default
            </Button>
            <Button color="success" variant="outline" icon={<FiPlus />}>
                Success Outline
            </Button>
            <Button color="success" variant="ghost" icon={<FiPlus />}>
                Success Ghost
            </Button>
        </div>
    ),
};

export const Fullscreen: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <Button fullscreen>Fullscreen Button</Button>
            <Button variant="outline" fullscreen icon={<FiPlus />}>
                Fullscreen with Icon
            </Button>
            <Button color="destructive" fullscreen>
                Fullscreen Destructive
            </Button>
            <div style={{ border: '1px dashed #ccc', padding: '10px', width: '50%' }}>
                <Button fullscreen>Container-Width Button</Button>
            </div>
        </div>
    ),
};
