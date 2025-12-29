import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
    title: 'Components/Container',
    component: Container,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
    render: () => (
        <Container>
            <div style={{ border: '1px dashed #ccc', padding: '20px' }}>
                <h2>Container Content</h2>
                <p>This content is wrapped in a Container component. The dashed border shows the content area.</p>
            </div>
        </Container>
    ),
};

export const NestedContainers: Story = {
    render: () => (
        <Container style={{ background: '#ddddd' }}>
            <div style={{ border: '1px dashed #999', padding: '20px', marginBottom: '20px' }}>
                <h3>Outer Container</h3>
                <p>This is the outer container with a light gray background.</p>
            </div>
            <Container style={{ background: '#ddddd' }}>
                <div style={{ border: '1px dashed #666', padding: '20px' }}>
                    <h3>Inner Container</h3>
                    <p>This demonstrates nesting of Container components with different background colors.</p>
                </div>
            </Container>
        </Container>
    ),
};
