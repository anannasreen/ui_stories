import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ControlGroup from '.';
import Button from '../Button';

const meta: Meta<typeof ControlGroup> = {
    title: 'Components/ControlGroup',
    component: ControlGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ControlGroup>;

export const Default: Story = {
    render: () => (
        <ControlGroup>
            <Button color="primary">Left</Button>
            <Button color="primary">Middle</Button>
            <Button color="primary">Right</Button>
        </ControlGroup>
    ),
};

export const WithInputs: Story = {
    render: () => (
        <ControlGroup>
            <Button color="primary">Search</Button>
            <input
                type="text"
                placeholder="Enter search term"
                style={{
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                }}
            />
            <Button color="primary">Submit</Button>
        </ControlGroup>
    ),
};

export const WithVariants: Story = {
    render: () => (
        <ControlGroup>
            <Button color="primary">Save</Button>
            <Button color="secondary">Edit</Button>
            <Button color="destructive">Delete</Button>
        </ControlGroup>
    ),
};

export const WithCustomStyling: Story = {
    render: () => (
        <ControlGroup style={{ background: '#f5f5f5', padding: '8px' }}>
            <Button color="primary">Primary</Button>
            <Button color="primary">Default</Button>
            <Button color="secondary">Secondary</Button>
        </ControlGroup>
    ),
};
