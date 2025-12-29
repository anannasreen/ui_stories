import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Video } from '.';

class MockMediaStream {
    id: string;
    constructor() {
        this.id = 'mock-stream-id';
    }
}
vi.stubGlobal('MediaStream', MockMediaStream);

describe('Video', () => {
    let mockMediaStream: MediaStream;
    let visibilityState: 'visible' | 'hidden' = 'visible';
    const visibilityChangeHandlers = new Set<EventListener>();

    beforeEach(() => {
        vi.clearAllMocks();
        mockMediaStream = new MediaStream();

        Object.defineProperty(document, 'visibilityState', {
            get: () => visibilityState,
            configurable: true,
        });

        vi.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
            if (event === 'visibilitychange') {
                visibilityChangeHandlers.add(handler as EventListener);
            }
        });

        vi.spyOn(document, 'removeEventListener').mockImplementation((event, handler) => {
            if (event === 'visibilitychange') {
                visibilityChangeHandlers.delete(handler as EventListener);
            }
        });
    });

    afterEach(() => {
        visibilityState = 'visible';
        visibilityChangeHandlers.clear();
    });

    it('should render video element', () => {
        render(<Video srcObject={mockMediaStream} data-testid="video-element" />);
        const videoElement = screen.getByTestId('video-element');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement.tagName.toLowerCase()).toBe('video');
    });

    it('should update srcObject when enabled and visible', () => {
        const { rerender } = render(<Video srcObject={mockMediaStream} data-testid="video-element" />);
        const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

        expect(videoElement.srcObject).toBe(mockMediaStream);

        const newMediaStream = new MediaStream();
        rerender(<Video srcObject={newMediaStream} data-testid="video-element" />);
        expect(videoElement.srcObject).toBe(newMediaStream);
    });

    it('should set srcObject to null when disabled', () => {
        const { rerender } = render(<Video srcObject={mockMediaStream} enabled={true} data-testid="video-element" />);
        const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

        expect(videoElement.srcObject).toBe(mockMediaStream);

        rerender(<Video srcObject={mockMediaStream} enabled={false} data-testid="video-element" />);
        expect(videoElement.srcObject).toBeNull();
    });

    it('should handle visibility state changes', () => {
        render(<Video srcObject={mockMediaStream} data-testid="video-element" />);
        const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

        expect(videoElement.srcObject).toBe(mockMediaStream);

        visibilityState = 'hidden';
        visibilityChangeHandlers.forEach((handler) => handler(new Event('visibilitychange')));
        expect(videoElement.srcObject).toBeNull();

        visibilityState = 'visible';
        visibilityChangeHandlers.forEach((handler) => handler(new Event('visibilitychange')));
        expect(videoElement.srcObject).toBe(mockMediaStream);
    });

    it('should cleanup visibility event listener on unmount', () => {
        const { unmount } = render(<Video srcObject={mockMediaStream} />);
        expect(visibilityChangeHandlers.size).toBe(1);

        unmount();
        expect(visibilityChangeHandlers.size).toBe(0);
    });

    it('should pass through additional video props', () => {
        render(<Video srcObject={mockMediaStream} autoPlay muted playsInline data-testid="video-element" />);

        const videoElement = screen.getByTestId('video-element');
        expect(videoElement.hasAttribute('autoplay')).toBe(true);
        expect(videoElement.hasAttribute('playsinline')).toBe(true);
    });
});
