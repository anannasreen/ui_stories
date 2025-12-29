import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '.';

const meta: Meta<typeof TextArea> = {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

const sampleText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// Interactive wrapper component
const InteractiveTextArea = (args: React.ComponentProps<typeof TextArea>) => {
    const [value, setValue] = React.useState(args.value ?? '');

    return (
        <TextArea
            {...args}
            value={value}
            onChange={(newValue: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setValue(newValue);
                args.onChange?.(newValue, e);
            }}
        />
    );
};

export const Default: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'Text Area',
        placeholder: 'Enter your text here',
    },
};

export const WithValue: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'With Initial Value',
        value: sampleText,
    },
};

export const WithAutoSize: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'Auto-sizing TextArea',
        value: sampleText,
        autoSize: true,
        placeholder: 'Type to see auto-sizing in action',
    },
};

export const WithHelpText: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'With Help Text',
        helpText: 'Enter your comments or feedback here',
        placeholder: 'Start typing...',
    },
};

export const WithError: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'With Error',
        error: 'This field is required',
        placeholder: 'This field has an error',
    },
};

export const CustomSize: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'Custom Size',
        width: '400px',
        rows: 6,
        placeholder: 'This textarea has custom dimensions',
    },
};

export const Disabled: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'Disabled TextArea',
        value: 'This textarea is disabled',
        disabled: true,
    },
};

export const WithLearnMore: Story = {
    render: (args) => <InteractiveTextArea {...args} />,
    args: {
        label: 'With Learn More',
        learnMore: (
            <a href="#" style={{ fontSize: '12px' }}>
                Learn more
            </a>
        ),
        placeholder: 'Enter your text',
    },
};

export const States: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '300px' }}>
            <InteractiveTextArea label="Default State" placeholder="Enter text here" />
            <InteractiveTextArea label="With Value" value={sampleText} />
            <InteractiveTextArea label="Auto-sizing" value={sampleText} autoSize />
            <InteractiveTextArea
                label="With Help Text"
                helpText="Additional information here"
                placeholder="Start typing..."
            />
            <InteractiveTextArea label="With Error" error="This field has an error" placeholder="Error state" />
            <InteractiveTextArea label="Disabled State" value="This textarea is disabled" disabled />
            <InteractiveTextArea label="With Custom Size" rows={4} placeholder="Custom height" />
        </div>
    ),
};
