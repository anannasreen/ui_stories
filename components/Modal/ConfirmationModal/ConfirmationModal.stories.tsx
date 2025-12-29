import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../..';
import ConfirmationModal from '.';

const meta: Meta<typeof ConfirmationModal> = {
    title: 'Components/Modal/ConfirmationModal',
    component: ConfirmationModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmationModal>;

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleConfirm = async () => {
            console.log('Confirmed');
            setIsOpen(false);
        };

        const handleCancel = async () => {
            console.log('Cancelled');
            setIsOpen(false);
        };

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>Open Confirmation Modal</Button>
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Confirm Action"
                >
                    Are you sure you want to proceed with this action?
                </ConfirmationModal>
            </div>
        );
    },
};

export const WithAsyncActions: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleConfirm = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Confirmed after delay');
            setIsOpen(false);
        };

        const handleCancel = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Cancelled after delay');
            setIsOpen(false);
        };

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>Open Modal with Async Actions</Button>
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Async Confirmation"
                >
                    This action will take a few seconds to complete.
                </ConfirmationModal>
            </div>
        );
    },
};

export const WithError: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleConfirm = async () => {
            await new Promise((_, reject) => setTimeout(() => reject(new Error('Failed')), 1000));
        };

        const handleCancel = async () => {
            setIsOpen(false);
        };

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>Open Modal with Error</Button>
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Error Example"
                >
                    This action will fail with an error.
                </ConfirmationModal>
            </div>
        );
    },
};

export const CustomContent: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>Open Modal with Custom Content</Button>
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onConfirm={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    title="Custom Content"
                >
                    <div style={{ textAlign: 'center' }}>
                        <h3>Custom Content</h3>
                        <p>This is a custom content example with styled elements.</p>
                        <div style={{ marginTop: '20px', color: 'blue' }}>✨ Special content here ✨</div>
                    </div>
                </ConfirmationModal>
            </div>
        );
    },
};
