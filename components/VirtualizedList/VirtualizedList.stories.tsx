import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import VirtualizedList from '.';
import { Orientation } from './types';

interface ListItem {
    id: string;
    content: string;
}

interface ListItemWithHeight extends ListItem {
    height: number;
}

const meta: Meta<typeof VirtualizedList> = {
    title: 'Components/VirtualizedList',
    component: VirtualizedList,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        onScroll: { action: 'scrolled' },
        onVisibleItemsChanged: { action: 'visibleItemsChanged' },
    },
    tags: ['autodocs'],
};

export default meta;

// Generate sample data
const generateItems = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: `item-${i}`,
        content: `Item ${i + 1}`,
    }));

const sampleItems = generateItems(1000);

// Basic vertical list
export const VerticalList: StoryObj<typeof VirtualizedList> = {
    args: {
        items: sampleItems,
        onScroll: action('scrolled'),
        onVisibleItemsChanged: action('visibleItemsChanged'),
        renderItem: (item: ListItem) => (
            <div
                style={{
                    padding: '12px',
                    border: '1px solid #eee',
                    margin: '4px',
                    borderRadius: '4px',
                    background: '#fff',
                }}
                onClick={() => action('itemClicked')(item)}
            >
                {item.content}
            </div>
        ),
        orientation: Orientation.Vertical,
        itemSize: 60,
        style: {
            height: '400px',
            width: '300px',
            background: '#f5f5f5',
            borderRadius: '8px',
        },
    },
} as StoryObj<typeof VirtualizedList>;

// Horizontal list
export const HorizontalList: StoryObj<typeof VirtualizedList> = {
    args: {
        items: sampleItems,
        onScroll: action('scrolled'),
        onVisibleItemsChanged: action('visibleItemsChanged'),
        renderItem: (item: ListItem) => (
            <div
                style={{
                    padding: '12px',
                    border: '1px solid #eee',
                    margin: '4px',
                    borderRadius: '4px',
                    background: '#fff',
                    whiteSpace: 'nowrap',
                }}
                onClick={() => action('itemClicked')(item)}
            >
                {item.content}
            </div>
        ),
        orientation: Orientation.Horizontal,
        itemSize: 180,
        style: {
            height: '100px',
            width: '800px',
            background: '#f5f5f5',
            borderRadius: '8px',
        },
    },
} as StoryObj<typeof VirtualizedList>;

// Dynamic size list
export const DynamicSizeList: StoryObj<typeof VirtualizedList> = {
    args: {
        items: sampleItems.map((item) => ({
            ...item,
            height: Math.floor(Math.random() * 50) + 50, // Random height between 50-100px
        })),
        onScroll: action('scrolled'),
        onVisibleItemsChanged: action('visibleItemsChanged'),
        renderItem: (item: ListItemWithHeight) => (
            <div
                style={{
                    padding: '12px',
                    border: '1px solid #eee',
                    margin: '4px',
                    borderRadius: '4px',
                    background: '#fff',
                    height: item.height,
                }}
                onClick={() => action('itemClicked')(item)}
            >
                {item.content} (Height: {item.height}px)
            </div>
        ),
        orientation: Orientation.Vertical,
        style: {
            height: '400px',
            width: '300px',
            background: '#f5f5f5',
            borderRadius: '8px',
        },
    },
} as StoryObj<typeof VirtualizedList>;

// Reversed list
export const ReversedList: StoryObj<typeof VirtualizedList> = {
    args: {
        items: sampleItems,
        onScroll: action('scrolled'),
        onVisibleItemsChanged: action('visibleItemsChanged'),
        renderItem: (item: ListItem) => (
            <div
                style={{
                    padding: '12px',
                    border: '1px solid #eee',
                    margin: '4px',
                    borderRadius: '4px',
                    background: '#fff',
                }}
                onClick={() => action('itemClicked')(item)}
            >
                {item.content}
            </div>
        ),
        orientation: Orientation.Vertical,
        itemSize: 60,
        reversed: true,
        style: {
            height: '400px',
            width: '300px',
            background: '#f5f5f5',
            borderRadius: '8px',
        },
    },
} as StoryObj<typeof VirtualizedList>;

// Centered first item
export const CenteredFirstItem: StoryObj<typeof VirtualizedList> = {
    args: {
        items: sampleItems,
        onScroll: action('scrolled'),
        onVisibleItemsChanged: action('visibleItemsChanged'),
        renderItem: (item: ListItem) => (
            <div
                style={{
                    padding: '12px',
                    border: '1px solid #eee',
                    margin: '4px',
                    borderRadius: '4px',
                    background: '#fff',
                }}
                onClick={() => action('itemClicked')(item)}
            >
                {item.content}
            </div>
        ),
        orientation: Orientation.Vertical,
        itemSize: 60,
        firstVisibleItemIndex: 5,
        firstVisibleItemCentered: true,
        style: {
            height: '400px',
            width: '300px',
            background: '#f5f5f5',
            borderRadius: '8px',
        },
    },
} as StoryObj<typeof VirtualizedList>;
