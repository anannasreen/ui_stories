import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './index';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const defaultItems = [
    {
        id: '1',
        title: 'What is Cobalt UI?',
        children: (
            <div>
                <p>
                    Cobalt UI is a design system that provides a set of reusable components for building consistent and
                    accessible user interfaces.
                </p>
            </div>
        ),
    },
    {
        id: '2',
        title: 'How do I install Cobalt UI?',
        children: (
            <div>
                <p>You can install Cobalt UI using npm or yarn:</p>
                <pre>npm install @cobalt/ui</pre>
            </div>
        ),
    },
    {
        id: '3',
        title: 'How do I contribute?',
        children: <p>We welcome contributions! Please check our contribution guidelines in the repository.</p>,
    },
];

export const Default: Story = {
    args: {
        items: defaultItems,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step('Toggle accordion', async () => {
            await userEvent.click(canvas.getByText('What is Cobalt UI?'));
        });
        await expect(
            canvas.getByText(
                'Cobalt UI is a design system that provides a set of reusable components for building consistent and accessible user interfaces.',
            ),
        ).toBeInTheDocument();
    },
};

export const WithDefaultExpanded: Story = {
    args: {
        items: defaultItems,
        defaultExpandedKeys: ['1'],
    },
};

export const WithDisabledItem: Story = {
    args: {
        items: [
            ...defaultItems.slice(0, 1),
            {
                ...defaultItems[1],
                isDisabled: true,
            },
            ...defaultItems.slice(2),
        ],
    },
};

export const WithCustomIcon: Story = {
    args: {
        items: defaultItems,
        customIcon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
};

export const AllDisabled: Story = {
    args: {
        items: defaultItems,
        isDisabled: true,
    },
};
