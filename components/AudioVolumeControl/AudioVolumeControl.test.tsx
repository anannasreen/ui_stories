import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { AudioVolumeControl } from '.';
import userEvent from '@testing-library/user-event';

describe('AudioVolumeControl', () => {
    it('renders with initial volume', () => {
        render(<AudioVolumeControl volume={0.5} />);

        const slider = screen.getByRole('slider') as HTMLInputElement;
        expect(slider.value).toBe('0.5');
    });

    it('shows mute icon when volume is 0', () => {
        render(<AudioVolumeControl volume={0} />);

        expect(screen.getByTestId('volume-mute-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('volume-down-icon')).not.toBeInTheDocument();
    });

    it('shows mute icon when muted', () => {
        render(<AudioVolumeControl volume={0.5} muted={true} />);

        expect(screen.getByTestId('volume-mute-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('volume-down-icon')).not.toBeInTheDocument();
    });

    it('shows volume down icon when not muted and volume > 0', () => {
        render(<AudioVolumeControl volume={0.5} muted={false} />);

        expect(screen.queryByTestId('volume-mute-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('volume-down-icon')).toBeInTheDocument();
    });

    it('calls onChange when volume slider changes', () => {
        const handleChange = vi.fn();
        render(<AudioVolumeControl volume={0.5} onChange={handleChange} />);

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '0.7' } });

        expect(handleChange).toHaveBeenCalledWith(0.7, false);
    });

    it('toggles mute when clicking volume down button', async () => {
        const handleChange = vi.fn();
        render(<AudioVolumeControl volume={0.5} onChange={handleChange} />);

        const volumeDownButton = screen.getByTestId('volume-down-icon').parentElement!;
        await userEvent.click(volumeDownButton);

        expect(handleChange).toHaveBeenCalledWith(0.5, true);
    });

    it('sets volume to max when clicking volume up button', async () => {
        const handleChange = vi.fn();
        render(<AudioVolumeControl volume={0.5} onChange={handleChange} />);

        const volumeUpButton = screen.getByTestId('volume-up-icon').parentElement!;
        await userEvent.click(volumeUpButton);

        expect(handleChange).toHaveBeenCalledWith(1, false);
    });

    it('unmutes and sets volume to 0.5 when clicking mute button with volume at 0', async () => {
        const handleChange = vi.fn();
        render(<AudioVolumeControl volume={0} onChange={handleChange} />);

        const muteButton = screen.getByTestId('volume-mute-icon').parentElement!;
        await userEvent.click(muteButton);

        expect(handleChange).toHaveBeenCalledWith(0.5, false);
    });
});
