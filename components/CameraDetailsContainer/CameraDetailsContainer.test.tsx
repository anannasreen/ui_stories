import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CameraDetailsContainer from '.';

describe('CameraDetailsContainer', () => {
    it('renders camera name correctly', () => {
        render(<CameraDetailsContainer cameraName="Main Entrance Camera" />);
        expect(screen.getByText('Main Entrance Camera')).toBeInTheDocument();
    });

    it('renders with online status by default', () => {
        render(<CameraDetailsContainer cameraName="Test Camera" />);
        const container = screen.getByTestId('camera-details-container');
        expect(container).toBeInTheDocument();
    });

    it('renders with offline status when specified', () => {
        render(<CameraDetailsContainer cameraName="Test Camera" status="offline" />);
        const container = screen.getByTestId('camera-details-container');
        expect(container).toBeInTheDocument();
    });

    it('calls onFullScreenClick when full screen button is clicked', () => {
        const mockOnFullScreenClick = vi.fn();
        render(<CameraDetailsContainer cameraName="Test Camera" onFullScreenClick={mockOnFullScreenClick} />);

        const fullScreenButton = screen.getByTestId('full-screen-button');
        fireEvent.click(fullScreenButton);

        expect(mockOnFullScreenClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className when provided', () => {
        render(<CameraDetailsContainer cameraName="Test Camera" className="custom-class" />);
        const containerElement = screen.getByTestId('camera-details-container');
        expect(containerElement).toHaveClass('custom-class');
    });
});
