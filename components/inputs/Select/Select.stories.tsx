import type { Meta, StoryObj } from '@storybook/react';
import Select, { GetValue } from '.';
import React, { useEffect, useState } from 'react';
import { MdHome, MdKeyboardArrowDown } from 'react-icons/md';
import { DateTimePicker } from '../DateTimePicker';
import { GetValues, SelectProps } from './Select';

const meta: Meta<typeof Select> = {
    title: 'Components/Inputs/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        multiple: {
            control: 'boolean',
            description: 'Allow multiple selections',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the select',
        },
        required: {
            control: 'boolean',
            description: 'Mark as required field',
        },
        destructive: {
            control: 'boolean',
            description: 'Show select in a destructive state',
        },
        hideLabel: {
            control: 'boolean',
            description: 'Hide the label text above the select',
        },
        icon: {
            control: 'object',
            description: 'Icon to display in the select',
        },
        value: {
            control: 'text',
            description: 'Value of the select',
        },
        options: {
            control: 'object',
            description: 'Options for the select',
        },
        onChange: {
            description: 'Callback when the select value changes',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text for the select',
        },
        error: {
            control: 'text',
            description: 'Error message to display',
        },
        label: {
            control: 'text',
            description: 'Label text to display',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

// Wrapper component for controlling width
const StoryWrapper = ({ children }: { children: React.ReactNode }) => <div style={{ padding: '20px' }}>{children}</div>;

// Interactive wrapper component to handle state
const InteractiveSelect = <
    T extends readonly { value: string; label?: string; icon?: React.ReactNode }[],
    Required extends boolean = false,
    Multiple extends boolean = false,
>(
    args: SelectProps<T, Required, Multiple>,
) => {
    const [value, setValue] = React.useState<any>(args.value);

    return (
        <Select
            {...args}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
                args.onChange?.(newValue);
            }}
        />
    );
};

type Option = {
    value: string;
    label?: string;
    icon?: React.ReactNode;
};

type SelectOptions = readonly Option[];

const options: SelectOptions = [
    { value: '1', label: 'First Option', icon: <MdHome size={16} /> },
    { value: '2', label: 'Second Option', icon: <MdHome size={16} /> },
    { value: '3', label: 'Third Option', icon: <MdHome size={16} /> },
    { value: '4', label: 'Fourth Option', icon: <MdHome size={16} /> },
    { value: '5', label: 'Fifth Option', icon: <MdHome size={16} /> },
    { value: '6', label: 'Sixth Option', icon: <MdHome size={16} /> },
    { value: '7', label: 'Seventh Option', icon: <MdHome size={16} /> },
    { value: '8', label: 'Eighth Option', icon: <MdHome size={16} /> },
    { value: '9', label: 'Ninth Option', icon: <MdHome size={16} /> },
    { value: '10', label: 'Tenth Option', icon: <MdHome size={16} /> },
    { value: '11', label: 'Eleventh Option', icon: <MdHome size={16} /> },
    { value: '12', label: 'Twelfth Option', icon: <MdHome size={16} /> },
] as const;

const optionsWithoutIcons: SelectOptions = [
    { value: '1', label: 'First Option' },
    { value: '2', label: 'Second Option' },
    { value: '3', label: 'Third Option' },
    { value: '4', label: 'Fourth Option' },
    { value: '5', label: 'Fifth Option' },
] as const;

export const Default: Story = {
    render: (args) => (
        <StoryWrapper>
            <InteractiveSelect {...args} width="300px" />
        </StoryWrapper>
    ),
    args: {
        options: [...options],
        placeholder: 'Choose...',
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic select component with default configuration. Supports keyboard navigation using arrow keys, home, and end.',
            },
        },
    },
};

export const WithValue: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        value: 'second',
    },
};

export const Disabled: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        disabled: true,
        value: 'second',
        placeholder: 'Select is disabled',
    },
};

export const Required: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        required: true,
    },
};

export const MultiSelect: Story = {
    render: (args) => (
        <StoryWrapper>
            <InteractiveSelect {...args} width="300px" />
        </StoryWrapper>
    ),
    args: {
        options: [...options],
        multiple: true,
        value: [],
        label: 'Select Region',
    },
    parameters: {
        docs: {
            description: {
                story: 'Multiple selection mode with search functionality. Selected items appear as pills. Use keyboard navigation to move between options.',
            },
        },
    },
};

export const WithLabel: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        label: 'Select Region',
        placeholder: 'Select...',
    },
};

export const WithIcon: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        placeholder: 'Select Region',
        icon: <MdKeyboardArrowDown size={16} />,
    },
};

export const WithIconAndLabel: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        label: 'Select Region',
        placeholder: 'Select...',
        icon: <MdHome size={16} />,
    },
};

export const WithHiddenLabel: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        label: 'Select Region',
        hideLabel: true,
        placeholder: 'Select...',
    },
};

export const Destructive: Story = {
    render: (args) => <InteractiveSelect {...args} />,
    args: {
        options: [...options],
        label: 'Delete Items',
        destructive: true,
        placeholder: 'Select items to delete',
        error: 'This action cannot be undone',
    },
};

export const WithDifferentWidths: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <StoryWrapper>
                <InteractiveSelect options={[...options]} placeholder="Small width (200px)" width="200px" />
            </StoryWrapper>
            <StoryWrapper>
                <InteractiveSelect options={[...options]} placeholder="Medium width (300px)" width="300px" />
            </StoryWrapper>
            <StoryWrapper>
                <InteractiveSelect options={[...options]} placeholder="Large width (400px)" width="400px" />
            </StoryWrapper>
            <StoryWrapper>
                <InteractiveSelect options={[...options]} placeholder="Full width (100%)" width="100%" />
            </StoryWrapper>
        </div>
    ),
};

export const WithoutIcons: Story = {
    render: (args) => (
        <StoryWrapper>
            <InteractiveSelect {...args} width="300px" />
        </StoryWrapper>
    ),
    args: {
        options: [...optionsWithoutIcons],
        placeholder: 'Select an option...',
    },
};

export const WithUUID: Story = {
    render: () => {
        const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);

        useEffect(() => {
            // Simulate loading options after 1 second
            const timer = setTimeout(() => {
                setDynamicOptions([
                    { value: 'uuid-1', label: 'First Option' },
                    { value: 'uuid-2', label: 'Second Option' },
                    { value: 'uuid-3', label: 'Third Option' },
                ]);
            }, 1000);

            return () => clearTimeout(timer);
        }, []);

        return (
            <StoryWrapper>
                <Select
                    label="Select Option"
                    value="uuid-2"
                    options={dynamicOptions}
                    placeholder="Loading options..."
                    width="300px"
                />
            </StoryWrapper>
        );
    },
    args: {
        value: 'uuid-2', // UUID value that doesn't exist in options initially
        placeholder: 'Loading options...',
    },
};

export const WithKeyboardNavigation: Story = {
    render: (args) => (
        <StoryWrapper>
            <InteractiveSelect {...args} width="300px" />
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                Try using:
                <ul>
                    <li>↑/↓ Arrow keys to navigate options</li>
                    <li>Home/End to jump to first/last option</li>
                    <li>Enter to select</li>
                    <li>Escape to close dropdown</li>
                </ul>
            </div>
        </StoryWrapper>
    ),
    args: {
        options: [...options],
        label: 'Keyboard Navigation Demo',
        placeholder: 'Use keyboard to navigate...',
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates keyboard navigation capabilities. The component supports full keyboard interaction for accessibility.',
            },
        },
    },
};

export const WithPreselectedValue: Story = {
    render: (args) => (
        <StoryWrapper>
            <InteractiveSelect {...args} width="300px" />
        </StoryWrapper>
    ),
    args: {
        options: [...options],
        value: '3',
        label: 'Preselected Value',
        placeholder: 'Select an option...',
    },
    parameters: {
        docs: {
            description: {
                story: 'When opened, the dropdown will focus on the preselected value for easier keyboard navigation.',
            },
        },
    },
};

export const ExternalValueUpdate: Story = {
    render: () => {
        const [selectedValue, setSelectedValue] = useState<string>('1');

        // Options for the select
        const options = [
            { value: '1', label: 'Main Office' },
            { value: '2', label: 'Lobby' },
            { value: '3', label: 'Conference Room' },
        ];

        return (
            <StoryWrapper>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Select
                        label="Selected option"
                        value={selectedValue}
                        onChange={(newValue) => {
                            if (typeof newValue === 'string') {
                                setSelectedValue(newValue);
                            }
                        }}
                        options={options}
                        width="400px"
                    />

                    <div style={{ display: 'flex', gap: '8px' }}>
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedValue(option.value)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: selectedValue === option.value ? '#007bff' : '#f0f0f0',
                                    color: selectedValue === option.value ? 'white' : 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </StoryWrapper>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates how the Select component updates when the value prop changes externally. Click the buttons below to update the selected value.',
            },
        },
    },
};
