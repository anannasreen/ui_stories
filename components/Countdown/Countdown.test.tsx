import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { Countdown } from '.';

describe('Countdown', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('displays initial time difference correctly', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future = new Date('2024-01-01T00:01:30');
        vi.setSystemTime(now);

        render(<Countdown to={future} />);
        expect(screen.getByText('1:30')).toBeInTheDocument();
    });

    it('updates countdown every second', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future = new Date('2024-01-01T00:01:30');
        vi.setSystemTime(now);

        render(<Countdown to={future} />);
        expect(screen.getByText('1:30')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('1:29')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('1:28')).toBeInTheDocument();
    });

    it('pads seconds with leading zero', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future = new Date('2024-01-01T00:01:05');
        vi.setSystemTime(now);

        render(<Countdown to={future} />);
        expect(screen.getByText('1:05')).toBeInTheDocument();
    });

    it('shows zero minutes correctly', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future = new Date('2024-01-01T00:00:45');
        vi.setSystemTime(now);

        render(<Countdown to={future} />);
        expect(screen.getByText('0:45')).toBeInTheDocument();
    });

    it('stops counting at zero', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future = new Date('2024-01-01T00:00:02');
        vi.setSystemTime(now);

        render(<Countdown to={future} />);
        expect(screen.getByText('0:02')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('0:01')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('0:00')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('0:00')).toBeInTheDocument();
    });

    it('cleans up interval on unmount', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future = new Date('2024-01-01T00:01:00');
        vi.setSystemTime(now);

        const { unmount } = render(<Countdown to={future} />);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        unmount();

        act(() => {
            vi.runAllTimers();
        });
    });

    it('handles date changes', () => {
        const now = new Date('2024-01-01T00:00:00');
        const future1 = new Date('2024-01-01T00:01:00');
        const future2 = new Date('2024-01-01T00:02:00');
        vi.setSystemTime(now);

        const { rerender } = render(<Countdown to={future1} />);
        expect(screen.getByText('1:00')).toBeInTheDocument();

        rerender(<Countdown to={future2} />);
        expect(screen.getByText('2:00')).toBeInTheDocument();
    });
});
