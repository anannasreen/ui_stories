import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RangeSlider from '.';
import React from 'react';

describe('RangeSlider', () => {
    it('renders range slider items', () => {
        render(<RangeSlider label="RangeSlider" />);
        expect(screen.getByText('RangeSlider')).toBeInTheDocument();
    });

    it('handles keyboard navigation', () => {
        render(<RangeSlider step={10} />);
        const slider = screen.getByRole('slider');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(screen.getByText('10')).toBeVisible();

        fireEvent.keyDown(slider, { key: 'Home' });
        expect(screen.getByText('0')).toBeVisible();

        fireEvent.keyDown(slider, { key: 'End' });
        expect(screen.getByText('100')).toBeVisible();

        fireEvent.keyDown(slider, { key: 'ArrowLeft' });
        expect(screen.getByText('90')).toBeVisible();

        fireEvent.keyDown(slider, { key: 'PageDown' });
        expect(screen.getByText('80')).toBeVisible();

        fireEvent.keyDown(slider, { key: 'PageUp' });
        expect(screen.getByText('90')).toBeVisible();
    });

    it('respects min and max values', () => {
        render(<RangeSlider minValue={0} maxValue={100} defaultValue={30} />);
        const slider = screen.getByRole('slider');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(screen.getByText('40')).toBeVisible();

        fireEvent.keyDown(slider, { key: 'ArrowLeft' });
        expect(screen.getByText('30')).toBeVisible();
    });

    it('renders tick marks when showTicks is true', () => {
        render(<RangeSlider minValue={0} maxValue={100} step={10} showTicks />);
        const ticks = screen.getAllByRole('separator');
        expect(ticks.length).toBeGreaterThan(0);
    });

    it('shows numeric input when showSliderInput is true', () => {
        render(<RangeSlider showSliderInput />);
        const input = screen.getByRole('Input');
        expect(input).toBeInTheDocument();
    });

    it('handles numeric input changes', () => {
        render(<RangeSlider showSliderInput />);
        const input = screen.getByRole('Input');

        fireEvent.change(input, { target: { value: '75' } });
        expect(screen.getByDisplayValue('75')).toBeVisible();
    });

    it('disables interaction when disabled', () => {
        render(<RangeSlider isDisabled />);
        const slider = screen.getByRole('slider');
        expect(slider).toBeDisabled();
    });

    it('prevents interaction when readOnly', () => {
        render(<RangeSlider isDisabled defaultValue={20} />);
        const slider = screen.getByRole('slider');
        expect(screen.getByDisplayValue('20')).toBeVisible();
        expect(slider).toBeDisabled();
    });
});
