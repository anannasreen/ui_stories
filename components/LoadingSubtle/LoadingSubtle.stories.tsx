import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LoadingSubtle from '.';

const meta: Meta<typeof LoadingSubtle> = {
    title: 'Components/LoadingSubtle',
    component: LoadingSubtle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingSubtle>;

export const Default: Story = {
    args: {
        dotSize: '0.125em',
        duration: '0.6s',
    },
};

export const LargerDots: Story = {
    args: {
        dotSize: '0.25em',
        duration: '0.6s',
    },
};

export const SlowerAnimation: Story = {
    args: {
        dotSize: '0.125em',
        duration: '1.2s',
    },
};

export const CustomHeight: Story = {
    args: {
        dotSize: '0.125em',
        duration: '0.6s',
        height: '2em',
    },
};
