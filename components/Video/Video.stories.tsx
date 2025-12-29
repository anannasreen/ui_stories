import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Video } from '.';

const meta: Meta<typeof Video> = {
    title: 'Components/Video',
    component: Video,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Video>;

// Mock MediaStream for stories
const createMockMediaStream = () => {
    const mockCanvas = document.createElement('canvas');
    mockCanvas.width = 640;
    mockCanvas.height = 480;
    const ctx = mockCanvas.getContext('2d');

    let frame = 0;
    const animate = () => {
        if (ctx) {
            // Background
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(0, 0, mockCanvas.width, mockCanvas.height);

            // Animated element
            const x = mockCanvas.width / 2 + Math.cos(frame / 30) * 100;
            const y = mockCanvas.height / 2 + Math.sin(frame / 30) * 50;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fillStyle = '#4CAF50';
            ctx.fill();

            frame++;
            requestAnimationFrame(animate);
        }
    };
    animate();

    const stream = mockCanvas.captureStream(30); // 30 FPS
    return stream;
};

// Wrapper component to manage MediaStream state
const VideoWrapper = (props: Omit<React.ComponentProps<typeof Video>, 'srcObject'>) => {
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const mockStream = createMockMediaStream();
        setStream(mockStream);

        return () => {
            mockStream.getTracks().forEach((track) => track.stop());
        };
    }, []);

    return <Video {...props} srcObject={stream} />;
};

export const Default: Story = {
    render: () => (
        <VideoWrapper autoPlay playsInline muted style={{ width: '640px', height: '480px', backgroundColor: '#000' }} />
    ),
};

export const Disabled: Story = {
    render: () => (
        <VideoWrapper
            autoPlay
            playsInline
            muted
            enabled={false}
            style={{ width: '640px', height: '480px', backgroundColor: '#000' }}
        />
    ),
};

export const SmallSize: Story = {
    render: () => (
        <VideoWrapper autoPlay playsInline muted style={{ width: '320px', height: '240px', backgroundColor: '#000' }} />
    ),
};

export const WithControls: Story = {
    render: () => (
        <VideoWrapper
            autoPlay
            playsInline
            muted
            controls
            style={{ width: '640px', height: '480px', backgroundColor: '#000' }}
        />
    ),
};

export const CustomStyling: Story = {
    render: () => (
        <VideoWrapper
            autoPlay
            playsInline
            muted
            controls
            style={{
                width: '640px',
                height: '480px',
                backgroundColor: '#000',
                borderRadius: '24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        />
    ),
};

export const ResponsiveSize: Story = {
    render: () => (
        <div style={{ width: '100%', maxWidth: '800px' }}>
            <VideoWrapper
                autoPlay
                playsInline
                controls
                style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000' }}
            />
        </div>
    ),
};
