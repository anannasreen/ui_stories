import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FormGroup from '.';

const meta: Meta<typeof FormGroup> = {
    title: 'Components/Inputs/FormGroup',
    component: FormGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
    args: {
        id: 'default-input',
        label: 'Input Label',
        children: <input id="default-input" type="text" placeholder="Enter text" />,
    },
};

export const WithHelpText: Story = {
    args: {
        id: 'help-input',
        label: 'Input with Help Text',
        helpText: 'This is some helpful information about the input field.',
        children: <input id="help-input" type="text" placeholder="Enter text" />,
    },
};

export const WithError: Story = {
    args: {
        id: 'error-input',
        label: 'Input with Error',
        error: 'This field is required',
        children: <input id="error-input" type="text" placeholder="Enter text" />,
    },
};

export const WithSuffix: Story = {
    args: {
        id: 'suffix-input',
        label: 'Input with Suffix',
        suffix: 'units',
        children: <input id="suffix-input" type="text" placeholder="Enter value" />,
    },
};

export const Disabled: Story = {
    args: {
        id: 'disabled-input',
        label: 'Disabled Input',
        disabled: true,
        children: <input id="disabled-input" type="text" placeholder="Enter text" disabled />,
    },
};

export const WithLearnMore: Story = {
    args: {
        id: 'learn-more-input',
        label: 'Input with Learn More',
        learnMore: <a href="#">Learn more</a>,
        children: <input id="learn-more-input" type="text" placeholder="Enter text" />,
    },
};

export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '300px' }}>
            <FormGroup id="default-state" label="Default State">
                <input id="default-state" type="text" placeholder="Enter text" />
            </FormGroup>

            <FormGroup id="help-state" label="With Help Text" helpText="This is some helpful information.">
                <input id="help-state" type="text" placeholder="Enter text" />
            </FormGroup>

            <FormGroup id="error-state" label="With Error" error="This field has an error">
                <input id="error-state" type="text" placeholder="Enter text" />
            </FormGroup>

            <FormGroup id="suffix-state" label="With Suffix" suffix="px">
                <input id="suffix-state" type="text" placeholder="Enter value" />
            </FormGroup>

            <FormGroup id="disabled-state" label="Disabled State" disabled>
                <input id="disabled-state" type="text" placeholder="Enter text" disabled />
            </FormGroup>
        </div>
    ),
};
