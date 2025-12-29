import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextInput from '.';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';

const meta: Meta<typeof TextInput> = {
    title: 'Components/Inputs/TextInput',
    component: TextInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter your password',
        width: '480px',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Username',
        placeholder: 'Enter username',
    },
};

export const WithHelpText: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter password',
        helpText: 'Password must be at least 8 characters long',
        type: 'password',
        prefixIcon: <MdOutlineLock size={20} />,
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter email',
        error: 'Please enter a valid email address',
        value: 'invalid-email',
    },
};

export const WithLearnMore: Story = {
    args: {
        label: 'API Key',
        placeholder: 'Enter API key',
        learnMore: (
            <a href="#" style={{ fontSize: '12px' }}>
                Where to find your API key?
            </a>
        ),
        width: '250px',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Read-only field',
        value: 'This field is disabled',
        disabled: true,
    },
};

export const WithSuffix: Story = {
    args: {
        label: 'Price',
        placeholder: '0.00',
        suffix: 'USD',
        width: '150px',
    },
};

export const WithAllFeatures: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        helpText: 'Must be at least 8 characters long',
        learnMore: (
            <a href="#" style={{ fontSize: '12px' }}>
                Password requirements
            </a>
        ),
        width: '480px',
    },
};

export const WithEmailIcon: Story = {
    args: {
        placeholder: 'Enter your email',
        prefixIcon: <MdOutlineEmail size={20} />,
        type: 'email',
    },
};
