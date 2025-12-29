import type { Meta, StoryObj } from '@storybook/react';
import { AudioVolumeControl } from '.';
import React from 'react';

const meta: Meta<typeof AudioVolumeControl> = {
    title: 'Components/AudioVolumeControl',
    component: AudioVolumeControl,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'An interactive audio volume control with real-time feedback.',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AudioVolumeControl>;

interface VolumeControlWrapperProps {
    initialVolume?: number;
    initialMuted?: boolean;
}

function VolumeControlWrapper({ initialVolume = 0.5, initialMuted = false }: VolumeControlWrapperProps) {
    const [state, setState] = React.useState({
        volume: initialVolume,
        muted: initialMuted,
    });

    const handleChange = (volume: number, muted?: boolean) => {
        setState((prev) => ({
            ...prev,
            volume: typeof volume === 'number' ? volume : prev.volume,
            muted: typeof muted === 'boolean' ? muted : prev.muted,
        }));
    };

    return (
        <div style={{ padding: '20px', background: '#2a2a2a', borderRadius: '8px' }}>
            <AudioVolumeControl volume={state.volume} muted={state.muted} onChange={handleChange} />
            <div style={{ marginTop: '20px', color: 'white', fontSize: '14px' }}>
                <div>Current Volume: {(state.volume * 100).toFixed(0)}%</div>
                <div>Muted: {state.muted ? 'Yes' : 'No'}</div>
            </div>
        </div>
    );
}

export const Default: Story = {
    render: () => <VolumeControlWrapper />,
    parameters: {
        docs: {
            description: {
                story: 'Interactive volume control starting at 50% volume.',
            },
        },
    },
};

export const Muted: Story = {
    render: () => <VolumeControlWrapper initialVolume={0.5} initialMuted={true} />,
    parameters: {
        docs: {
            description: {
                story: 'Interactive volume control starting in muted state.',
            },
        },
    },
};

export const FullVolume: Story = {
    render: () => <VolumeControlWrapper initialVolume={1} initialMuted={false} />,
    parameters: {
        docs: {
            description: {
                story: 'Interactive volume control starting at full volume.',
            },
        },
    },
};

export const NoVolume: Story = {
    render: () => <VolumeControlWrapper initialVolume={0} initialMuted={false} />,
    parameters: {
        docs: {
            description: {
                story: 'Interactive volume control starting at zero volume.',
            },
        },
    },
};
