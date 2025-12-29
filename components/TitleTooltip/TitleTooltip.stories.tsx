import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FiInfo, FiPlus, FiTrash2 } from 'react-icons/fi';
import TitleTooltip from './TitleTooltip';
import Button from '../Button';

const meta: Meta<typeof TitleTooltip> = {
    title: 'Components/TitleTooltip',
    component: TitleTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TitleTooltip>;

export const Basic: Story = {
    args: {
        title: 'This is a tooltip',
        children: <button>Hover me</button>,
    },
};

export const WithButton: Story = {
    args: {
        title: 'This is a tooltip for a button',
        children: <Button color="primary">Hover me</Button>,
    },
};

export const WithDelay: Story = {
    args: {
        title: 'This tooltip has a longer delay',
        delay: 1000,
        children: <Button color="primary">Longer delay (1s)</Button>,
    },
};

export const WithOffset: Story = {
    args: {
        title: 'This tooltip has a larger offset',
        offset: 16,
        children: <Button color="primary">Larger offset</Button>,
    },
};

// This demonstrates that the Button component itself handles tooltips
export const ButtonWithTooltip = () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button title="Add a new item" color="primary" icon={<FiPlus />}>
            Add Item
        </Button>

        <Button title="Delete this item" color="destructive" icon={<FiTrash2 />}>
            Delete
        </Button>

        <Button title="Information tooltip" color="primary" variant="outline" icon={<FiInfo />} iconOnly rounded />

        <Button title="This is a link button with tooltip" href="#" color="secondary">
            Link Button
        </Button>
    </div>
);

// This demonstrates how tooltips work with different button variants
export const ButtonVariants = () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button title="Primary button tooltip" color="primary">
                Primary
            </Button>
            <Button title="Secondary button tooltip" color="secondary">
                Secondary
            </Button>
            <Button title="Outline button tooltip" color="primary" variant="outline">
                Outline
            </Button>
            <Button title="Ghost button tooltip" color="primary" variant="ghost">
                Ghost
            </Button>
            <Button title="Destructive button tooltip" color="destructive">
                Destructive
            </Button>
        </div>

        <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Hover over any button to see its tooltip. The tooltip is accessible via keyboard focus as well.
            </p>
        </div>
    </div>
);

// This demonstrates how tooltips work with icon-only buttons
export const IconButtons = () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button title="Add item" color="primary" icon={<FiPlus />} iconOnly rounded />
        <Button title="Delete item" color="destructive" icon={<FiTrash2 />} iconOnly rounded />
        <Button title="Information" color="primary" variant="outline" icon={<FiInfo />} iconOnly rounded />
        <Button title="Ghost icon button" color="primary" variant="ghost" icon={<FiInfo />} iconOnly rounded />
    </div>
);

export const WithArrowPlacement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px', alignItems: 'center', padding: '100px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
            <TitleTooltip title="Top placement" placement="top">
                <Button color="primary">Top</Button>
            </TitleTooltip>
            <TitleTooltip title="Bottom placement" placement="bottom">
                <Button color="primary">Bottom</Button>
            </TitleTooltip>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <TitleTooltip title="Left placement" placement="left">
                <Button color="primary">Left</Button>
            </TitleTooltip>
            <TitleTooltip title="Right placement" placement="right">
                <Button color="primary">Right</Button>
            </TitleTooltip>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <TitleTooltip title="Start placement" placement="start">
                <Button color="primary">Start</Button>
            </TitleTooltip>
            <TitleTooltip title="End placement" placement="end">
                <Button color="primary">End</Button>
            </TitleTooltip>
        </div>
    </div>
);
