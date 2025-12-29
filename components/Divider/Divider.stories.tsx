import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
    title: 'Components/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'The orientation of the divider',
            defaultValue: 'horizontal',
        },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        (Story) => (
            <div>
                <div style={{ margin: '8px' }}>Content Above</div>
                <Story />
                <div style={{ margin: '8px' }}>Content Below</div>
            </div>
        ),
    ],
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
    },
    decorators: [
        (Story) => (
            <div style={{ height: '100px', display: 'flex', alignItems: 'center', padding: '20px' }}>
                <div style={{ margin: '8px' }}>Left Content</div>
                <Story />
                <div style={{ margin: '8px' }}>Right Content</div>
            </div>
        ),
    ],
};
