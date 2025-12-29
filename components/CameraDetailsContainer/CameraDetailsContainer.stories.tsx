import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CameraDetailsContainer from '.';

const meta: Meta<typeof CameraDetailsContainer> = {
    title: 'Components/CameraDetailsContainer',
    component: CameraDetailsContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onFullScreenClick: { action: 'fullscreen clicked' },
    },
    decorators: [(Story) => <div style={{ width: '400px' }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof CameraDetailsContainer>;

export const Online: Story = {
    args: {
        cameraName: 'Camera Name',
        status: 'online',
    },
};

export const Offline: Story = {
    args: {
        cameraName: 'Offline Camera',
        status: 'offline',
    },
};
