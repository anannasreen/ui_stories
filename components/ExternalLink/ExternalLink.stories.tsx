import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ExternalLink from './ExternalLink';

const meta: Meta<typeof ExternalLink> = {
    title: 'Components/ExternalLink',
    component: ExternalLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        href: {
            description: 'URL the link points to',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        target: {
            description: 'Target attribute for the link',
            control: 'select',
            options: ['_blank', '_self', '_parent', '_top'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '_blank' },
            },
        },
        rel: {
            description: 'Relationship attribute for the link',
            control: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'noreferrer' },
            },
        },
        className: {
            description: 'Additional CSS class names',
            control: 'text',
        },
        children: {
            description: 'Link text content',
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
    args: {
        href: 'https://www.example.com',
        children: 'Visit Example Website',
    },
};

export const CustomTarget: Story = {
    args: {
        href: 'https://www.example.com',
        children: 'Open in Same Window',
        target: '_self',
    },
};

export const WithCustomRel: Story = {
    args: {
        href: 'https://www.example.com',
        children: 'Custom Rel Attribute',
        rel: 'noopener noreferrer',
    },
};

export const WithCustomClass: Story = {
    args: {
        href: 'https://www.example.com',
        children: 'Styled Link',
        className: 'custom-link',
    },
};

export const MultipleLinks: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ExternalLink href="https://www.example.com">Example Website</ExternalLink>
            <ExternalLink href="https://www.github.com">GitHub</ExternalLink>
            <ExternalLink href="https://www.docs.example.com">Documentation</ExternalLink>
        </div>
    ),
};

export const LongText: Story = {
    args: {
        href: 'https://www.example.com',
        children:
            'This is a very long link text that might wrap to multiple lines to demonstrate how the component handles long content with the external link icon',
    },
};
