import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Framer from './Framer';

const meta = {
    title: 'Components/Framer',
    component: Framer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        stripeWidth: {
            control: { type: 'range', min: 10, max: 50, step: 5 },
            description: 'Width of each stripe in the border',
        },
    },
} satisfies Meta<typeof Framer>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleContent = () => (
    <div
        style={{
            padding: '2rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
    >
        <h3 style={{ color: 'black' }}>Example Content</h3>
        <p style={{ color: 'black' }}>This is some content inside the Framer component.</p>
    </div>
);

export const Basic: Story = {
    args: {
        stripeWidth: 20,
        children: <ExampleContent />,
    },
};

export const CustomStripeWidth: Story = {
    args: {
        stripeWidth: 40,
        children: <ExampleContent />,
    },
};

export const WithCustomStyles: Story = {
    args: {
        stripeWidth: 20,
        style: { padding: '2rem', background: '#f5f5f5' },
        children: <ExampleContent />,
    },
};

export const NestedFramers: Story = {
    render: () => (
        <Framer stripeWidth={20}>
            <div style={{ padding: '2rem', backgroundColor: 'white' }}>
                <h3 style={{ color: 'black' }}>Outer Framer</h3>
                <Framer stripeWidth={15}>
                    <div style={{ padding: '1rem', backgroundColor: 'wheat' }}>
                        <h4 style={{ color: 'black' }}>Inner Framer</h4>
                        <p style={{ color: 'black' }}>This demonstrates nested Framer components.</p>
                    </div>
                </Framer>
            </div>
        </Framer>
    ),
};

export const InteractiveExample: Story = {
    render: () => {
        const [isHovered, setIsHovered] = React.useState(false);

        return (
            <Framer
                stripeWidth={20}
                style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                <div
                    style={{
                        padding: '2rem',
                        background: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h3 style={{ color: 'black' }}>Interactive Example</h3>
                    <p style={{ color: 'black' }}>Hover over me to see the animation!</p>
                </div>
            </Framer>
        );
    },
};
