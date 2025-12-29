import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MonitorListItem from '.';
import { action } from '@storybook/addon-actions';
import eventCard from '../../stories/assets/images/event-card.png';

const meta: Meta<typeof MonitorListItem> = {
    title: 'Components/MonitorListItem',
    component: MonitorListItem,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: true,
                iframeHeight: 500,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '500px', padding: '0 var(--spacing-padding-3x)' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MonitorListItem>;

const baseTime = '2025-03-22T09:23:52+05:30';

const baseArgs = {
    sourceDevice: 'Camera 1',
    issueTitle: 'Motion Detected',
    cameraLocation: 'Building A - San Francisco Office',
    time: baseTime,
    href: '#destination',
};

// Image Examples
export const WithImage: Story = {
    args: {
        ...baseArgs,
        image: eventCard,
        priority: 'normal',
        eventStatus: 'open',
        state: 'unread',
    },
};

export const WithoutImage: Story = {
    args: {
        ...baseArgs,
        image: undefined,
        priority: 'normal',
        eventStatus: 'open',
        state: 'read',
    },
};

export const WithInvalidImage: Story = {
    args: {
        ...baseArgs,
        image: 'https://invalid-image-url.jpg',
        priority: 'normal',
        eventStatus: 'open',
        state: 'selected',
    },
};

// Priority Level Examples
export const Default: Story = {
    args: {
        ...baseArgs,
        image: eventCard,
        priority: 'normal',
        eventStatus: 'open',
        issueTitle: 'Recent Motion Event',
        state: 'unread',
    },
};

export const HighPriority: Story = {
    args: {
        ...baseArgs,
        image: eventCard,
        priority: 'high',
        eventStatus: 'open',
        issueTitle: 'Week-old Motion Event',
        state: 'unread',
    },
};

export const CriticalPriority: Story = {
    args: {
        ...baseArgs,
        image: eventCard,
        priority: 'critical',
        eventStatus: 'inProgress',
        issueTitle: 'Month-old Motion Event',
        state: 'unread',
    },
};

// State Examples
export const ReadItem: Story = {
    args: {
        ...baseArgs,
        image: eventCard,
        priority: 'normal',
        eventStatus: 'open',
        state: 'read',
    },
};

export const SelectedItem: Story = {
    args: {
        ...baseArgs,
        image: eventCard,
        priority: 'normal',
        eventStatus: 'open',
        state: 'selected',
    },
};

// Multiple items
const MonitorListWithOnClick = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [itemStates, setItemStates] = useState<Array<'unread' | 'read' | 'selected'>>(['unread', 'unread', 'unread']);

    const items = [
        {
            ...baseArgs,
            image: eventCard,
            issueTitle: 'Motion Detected - Entrance',
            cameraLocation: 'Building A - Main Entrance',
            priority: 'critical' as const,
            eventStatus: 'open' as const,
        },
        {
            ...baseArgs,
            image: eventCard,
            issueTitle: 'Suspicious Activity',
            cameraLocation: 'Building B - Parking Lot',
            priority: 'high' as const,
            eventStatus: 'inProgress' as const,
        },
        {
            ...baseArgs,
            image: eventCard,
            issueTitle: 'Package Delivery',
            cameraLocation: 'Building A - Loading Dock',
            priority: 'normal' as const,
            eventStatus: 'open' as const,
        },
    ];

    const handleItemClick = (index: number) => {
        // Update states for all items
        setItemStates((prevStates) =>
            prevStates.map((state, i) => {
                if (i === index) {
                    // Set clicked item to selected (and read if it was unread)
                    return 'selected';
                } else if (i === selectedIndex) {
                    // Previously selected item becomes read
                    return 'read';
                }
                // Keep other items' states unchanged
                return state;
            }),
        );
        setSelectedIndex(index);
    };

    return (
        <div style={{ display: 'flex', gap: '20px', width: '800px', height: '600px' }}>
            {/* List on the left side */}
            <div style={{ width: '400px' }}>
                {items.map((item, index) => (
                    <MonitorListItem key={index} {...item} state={itemStates[index]} href={`/monitor/${index}`} />
                ))}
            </div>

            {/* Right side content */}
            <div
                style={{
                    width: '280px',
                    backgroundColor: 'var(--surface-primary-default)',
                    padding: '20px',
                    borderRadius: '8px',
                    display: selectedIndex !== null ? 'block' : 'none',
                }}
            >
                {selectedIndex !== null && (
                    <div>
                        <h3 style={{ margin: '0 0 16px 0' }}>Event Details</h3>
                        <h4 style={{ margin: '0 0 8px 0' }}>{items[selectedIndex].issueTitle}</h4>
                        <p style={{ margin: '0 0 8px 0' }}>{items[selectedIndex].cameraLocation}</p>
                        <p style={{ margin: '0', opacity: 0.7 }}>{items[selectedIndex].sourceDevice}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export const MultipleItemsWithModal: Story = {
    render: () => <MonitorListWithOnClick />,
};
