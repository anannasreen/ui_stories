import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RangeSlider from '.';

const meta: Meta<typeof RangeSlider> = {
    title: 'Components/RangeSlider',
    component: RangeSlider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Active: Story = {
    render: () => <RangeSlider />,
};

export const WithMaxAndMinValue: Story = {
    render: () => <RangeSlider minValue={10} maxValue={60} />,
};

export const WithNumberField: Story = {
    render: () => <RangeSlider showSliderInput />,
};

export const Disabled: Story = {
    render: () => <RangeSlider isDisabled />,
};

export const ReadOnly: Story = {
    render: () => <RangeSlider defaultValue={25} isDisabled />,
};

export const WithStep: Story = {
    render: () => <RangeSlider step={0.01} maxValue={1} />,
};

export const WithTicks: Story = {
    render: () => <RangeSlider showTicks />,
};

export const WithMultipleThumbs: Story = {
    render: () => <RangeSlider defaultValue={[25, 50]} thumbLabels={['start', 'end']} />,
};

export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <RangeSlider label="Active" />
            <RangeSlider minValue={10} maxValue={60} label="With max and min value" />
            <RangeSlider label="With number field" showSliderInput />
            <RangeSlider isDisabled label="Disabled" />
            <RangeSlider defaultValue={25} isDisabled label="Read-only" />
            <RangeSlider step={0.01} maxValue={1} label="With step" />
            <RangeSlider showTicks label="With tick marks" />
            <RangeSlider defaultValue={[25, 50]} label="With multiple thumbs" thumbLabels={['start', 'end']} />
        </div>
    ),
};
