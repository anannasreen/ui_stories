import React from 'react';
import {
    MdVolumeDown as IconVolumeDown,
    MdVolumeUp as IconVolumeUp,
    MdVolumeOff as IconVolumeMute,
} from 'react-icons/md';
import styleVariables from '../../styles/constants.module.scss';
import styles from './AudioVolumeControl.module.scss';

/**
 * Props for the AudioVolumeControl component
 */
export type AudioVolumeControlProps = {
    /** The current volume level, between 0 and 1 */
    volume: number; // 0-1
    /** Whether the audio is muted */
    muted?: boolean;
    /** Callback function that's triggered when volume or mute state changes */
    onChange?: (volume: number, muted?: boolean) => void;
};

/**
 * Audio volume control component with mute functionality
 *
 * Provides an interactive volume control interface that includes a slider for volume adjustment
 * and buttons for quick mute/unmute operations.
 *
 * ```tsx
 * <AudioVolumeControl
 *   volume={0.5}
 *   muted={false}
 *   onChange={(volume, muted) => {
 *     console.log(`Volume: ${volume}, Muted: ${muted}`);
 *   }}
 * />
 * ```
 */
export function AudioVolumeControl({ volume, muted = false, onChange = () => {} }: AudioVolumeControlProps) {
    const handleVolumeChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number.parseFloat(changeEvent.target.value);
        onChange(volume, false);
    };

    const handleVolumeMinClick = () => {
        const newVolume = volume === 0 ? 0.5 : volume;
        const newMuted = volume === 0 ? false : !muted;

        onChange(newVolume, newMuted);
    };

    const handleVolumeMaxClick = () => {
        onChange(1, false);
    };

    return (
        <div className={!muted && volume ? styles.root : styles.rootMuted}>
            <a onClick={handleVolumeMinClick} className={styles.volumeButton}>
                {muted || volume === 0 ? (
                    <IconVolumeMute
                        size={16}
                        fill="white"
                        className={styles.volumeIcon}
                        data-testid="volume-mute-icon"
                    />
                ) : (
                    <IconVolumeDown
                        size={16}
                        fill={styleVariables.grey4}
                        className={styles.volumeIcon}
                        data-testid="volume-down-icon"
                    />
                )}
            </a>
            <input
                type="range"
                value={volume}
                onChange={handleVolumeChange}
                min={0.0}
                max={1.0}
                step={0.01}
                className={styles.volumeSlider}
            />
            <a onClick={handleVolumeMaxClick} className={styles.volumeButton}>
                <IconVolumeUp
                    size={16}
                    fill={!muted && volume ? styleVariables.grey4 : 'white'}
                    className={styles.volumeIcon}
                    data-testid="volume-up-icon"
                />
            </a>
        </div>
    );
}
