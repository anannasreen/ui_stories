import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Inputs/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Default Checkbox',
    },
};

export const Checked: Story = {
    args: {
        label: 'Checked Checkbox',
        value: true,
    },
};

export const Indeterminate: Story = {
    args: {
        label: 'Indeterminate Checkbox',
        indeterminate: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Checkbox',
        disabled: true,
    },
};

export const Destructive: Story = {
    args: {
        label: 'Destructive Checkbox',
        destructive: true,
    },
};

export const LabelAlignment: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <Checkbox label="Right-aligned Label (Default)" />
            <Checkbox label="Left-aligned Label" alignLabel="left" />
        </div>
    ),
};

export const Interactive: Story = {
    render: () => {
        const [parentChecked, setParentChecked] = useState(false);
        const [childChecks, setChildChecks] = useState([false, false, false]);
        const [isIndeterminate, setIsIndeterminate] = useState(false);

        const handleParentChange = (checked: boolean) => {
            setParentChecked(checked);
            setChildChecks(childChecks.map(() => checked));
            setIsIndeterminate(false);
        };

        const handleChildChange = (index: number, checked: boolean) => {
            const newChildChecks = [...childChecks];
            newChildChecks[index] = checked;
            setChildChecks(newChildChecks);

            const allChecked = newChildChecks.every((check) => check);
            const someChecked = newChildChecks.some((check) => check);

            setParentChecked(allChecked);
            setIsIndeterminate(someChecked && !allChecked);
        };

        return (
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <div style={{ marginBottom: '16px' }}>
                    <Checkbox
                        label="Parent Checkbox"
                        value={parentChecked}
                        indeterminate={isIndeterminate}
                        onChange={handleParentChange}
                    />
                </div>
                <div style={{ marginLeft: '24px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    {childChecks.map((checked, index) => (
                        <Checkbox
                            key={index}
                            label={`Child Checkbox ${index + 1}`}
                            value={checked}
                            onChange={(checked) => handleChildChange(index, checked)}
                        />
                    ))}
                </div>
            </div>
        );
    },
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <div style={{ marginBottom: '8px' }}>
                <strong>Default States</strong>
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '8px' }}>
                    <Checkbox label="Unchecked" />
                    <Checkbox label="Checked" value={true} />
                    <Checkbox label="Indeterminate" indeterminate={true} />
                </div>
            </div>

            <div style={{ marginBottom: '8px' }}>
                <strong>Disabled State</strong>
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '8px' }}>
                    <Checkbox label="Disabled" disabled />
                </div>
            </div>

            <div>
                <strong>Destructive State</strong>
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '8px' }}>
                    <Checkbox label="Destructive" destructive />
                </div>
            </div>
        </div>
    ),
};
