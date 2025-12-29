import type { Meta, StoryObj } from '@storybook/react';
import WorkFlowStatus from '.';

const meta: Meta<typeof WorkFlowStatus> = {
    title: 'Components/WorkFlowStatus',
    component: WorkFlowStatus,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkFlowStatus>;

export const Included: Story = {
    args: {
        variant: 'included',
        description: 'Checked site filters ',
        status: 'person found',
    },
};

export const Checking: Story = {
    args: {
        variant: 'checking',
        description: 'Checking site filters',
        status: 'Checking...',
    },
};

export const Unchecked: Story = {
    args: {
        variant: 'unchecked',
        description: ' Site filters',
        status: 'Unchecked',
    },
};
