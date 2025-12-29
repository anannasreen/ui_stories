import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi, vitest } from 'vitest';
import { VideoPlayer } from './index';
import { FiUser, FiAlertCircle, FiFileText } from 'react-icons/fi';
import styles from './VideoPlayer.module.scss';

describe('VideoPlayer', () => {
    const mockVideoUrl = 'test-video.mp4';
    const mockStartTime = '2025-03-11T03:26:06Z';
    const mockEndTime = '2025-03-11T03:29:06Z';
    const mockEvents = [
        {
            time: '2025-03-11T03:27:06Z',
            icon: <FiUser data-testid="fi-user" />,
            title: 'Person Detected',
        },
        {
            time: '2025-03-11T03:28:06Z',
            icon: <FiAlertCircle data-testid="fi-alert-circle" />,
            title: 'Security Alert',
        },
        {
            time: '2025-03-11T03:29:06Z',
            icon: <FiFileText data-testid="fi-file-text" />,
            title: 'Document Event',
        },
    ];

    beforeEach(() => {
        // Mock video element methods and properties
        window.HTMLMediaElement.prototype.play = vi.fn();
        window.HTMLMediaElement.prototype.pause = vi.fn();
        window.HTMLMediaElement.prototype.load = vi.fn();
    });

    it('renders video player with basic controls', () => {
        const onClick = vitest.fn();
        render(
            <div onClick={onClick}>
                <VideoPlayer videoUrl={mockVideoUrl} videoStartTime={mockStartTime} videoEndTime={mockEndTime} />
            </div>,
        );

        expect(screen.getByRole('video')).toBeInTheDocument();
        const playButton = screen.getByRole('button', { name: 'Play' });
        expect(playButton).toBeInTheDocument();
        expect(playButton).toHaveClass(styles.playButton);

        // Ensure play click doesn't bubble up to parent elements
        userEvent.click(playButton);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('positions event markers correctly on timeline', () => {
        // Mock ResizeObserver to provide a consistent width
        const mockResizeObserver = vi.fn();
        mockResizeObserver.mockImplementation((callback) => {
            callback([{ contentRect: { width: 500 } }]);
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
            };
        });
        window.ResizeObserver = mockResizeObserver;

        const { container } = render(
            <VideoPlayer
                videoUrl={mockVideoUrl}
                videoStartTime={mockStartTime}
                events={mockEvents}
                videoEndTime={mockEndTime}
            />,
        );

        // Simulate video metadata loaded with duration
        const video = container.querySelector('video');
        if (video) {
            Object.defineProperty(video, 'duration', { value: 180 }); // 3 minutes duration
            fireEvent.loadedMetadata(video);
        }

        const markers = screen.getAllByTestId(/^event-marker-/);
        expect(markers).toHaveLength(mockEvents.length);

        const eventTimes = markers.map((marker) => marker.getAttribute('data-time'));

        mockEvents.forEach((event) => {
            expect(eventTimes).toContain(event.time);
        });

        const sortedMockEvents = [...mockEvents].sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
        );

        const sortedEventTimes = sortedMockEvents.map((event) => event.time);
        expect(sortedEventTimes).toEqual(sortedMockEvents.map((event) => event.time));
    });

    it('auto-plays on hover when playOnHover is true', async () => {
        render(
            <VideoPlayer
                videoUrl={mockVideoUrl}
                videoStartTime={mockStartTime}
                videoEndTime={mockEndTime}
                playOnHover={true}
            />,
        );

        const videoWrapper = screen.getByRole('video').parentElement;
        await userEvent.hover(videoWrapper!);
        expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

        await userEvent.unhover(videoWrapper!);
        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    it('toggles fullscreen mode', async () => {
        document.exitFullscreen = vi.fn();
        Element.prototype.requestFullscreen = vi.fn();

        render(<VideoPlayer videoUrl={mockVideoUrl} videoStartTime={mockStartTime} videoEndTime={mockEndTime} />);

        const fullscreenButton = screen.getByTitle('Toggle fullscreen');
        await userEvent.click(fullscreenButton);
        expect(Element.prototype.requestFullscreen).toHaveBeenCalled();
    });

    it('displays events in chronological order', () => {
        const { container } = render(
            <VideoPlayer
                videoUrl={mockVideoUrl}
                videoStartTime={mockStartTime}
                events={mockEvents}
                videoEndTime={mockEndTime}
            />,
        );

        // Simulate video metadata loaded with duration
        const video = container.querySelector('video');
        if (video) {
            Object.defineProperty(video, 'duration', { value: 180 }); // 3 minutes duration
            fireEvent.loadedMetadata(video);
        }

        const markers = screen.getAllByTestId(/^event-marker-/);
        const eventTimes = markers.map((marker) => marker.getAttribute('data-time'));
        expect(eventTimes).toEqual(mockEvents.map((event) => event.time));
    });

    it('hides controls when showControls is false', () => {
        render(
            <VideoPlayer
                videoUrl={mockVideoUrl}
                videoStartTime={mockStartTime}
                showControls={false}
                videoEndTime={mockEndTime}
            />,
        );

        expect(screen.queryByRole('group', { name: 'Video controls' })).not.toBeInTheDocument();
    });

    it('displays start and end times correctly', () => {
        render(
            <VideoPlayer
                videoUrl={mockVideoUrl}
                videoStartTime={mockStartTime}
                videoEndTime={mockEndTime}
                showTimestamps={true}
            />,
        );

        const currentTime = screen.getByTestId('current-time');
        const endTime = screen.getByTestId('end-time');

        expect(currentTime).toBeInTheDocument();
        expect(endTime).toBeInTheDocument();
    });

    it('updates progress when seeking', () => {
        const { container } = render(
            <VideoPlayer videoUrl={mockVideoUrl} videoStartTime={mockStartTime} videoEndTime={mockEndTime} />,
        );

        // Simulate video metadata loaded with duration
        const video = container.querySelector('video');
        if (video) {
            Object.defineProperty(video, 'duration', { value: 180 }); // 3 minutes duration
            fireEvent.loadedMetadata(video);
        }

        const seekBar = screen.getByRole('slider');
        fireEvent.change(seekBar, { target: { value: '90' } }); // Seek to 90 seconds

        expect(seekBar).toHaveValue('90');
    });

    it('formats time with timezone correctly', () => {
        const timezone = 'America/New_York';
        render(
            <VideoPlayer
                videoUrl={mockVideoUrl}
                videoStartTime={mockStartTime}
                videoEndTime={mockEndTime}
                timezone={timezone}
                showTimestamps={true}
            />,
        );

        const currentTime = screen.getByTestId('current-time');
        const endTime = screen.getByTestId('end-time');

        expect(currentTime).toBeInTheDocument();
        expect(endTime).toBeInTheDocument();
    });
});
