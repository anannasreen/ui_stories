import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ActionGroup from './index';
import Button from '../Button';

const meta: Meta<typeof ActionGroup> = {
    title: 'Components/ActionGroup',
    component: ActionGroup,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: (
            <>
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button variant="ghost" color="primary">
                    Ghost
                </Button>
            </>
        ),
    },
    argTypes: {
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionGroup>;

export const Default: Story = {};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
    },
};

export const WithDestructiveAction: Story = {
    args: {
        children: (
            <>
                <Button color="destructive">Delete</Button>
                <Button variant="ghost" color="primary">
                    Cancel
                </Button>
            </>
        ),
    },
};

export const WithIcons: Story = {
    args: {
        children: (
            <>
                <Button variant="outline" color="primary" icon={<span>⏱️</span>}>
                    In-Progress
                </Button>
                <Button variant="outline" color="primary" icon={<span>⏸️</span>}>
                    On-Hold
                </Button>
                <Button variant="outline" color="success" icon={<span>✅</span>}>
                    Resolve
                </Button>
            </>
        ),
    },
};
