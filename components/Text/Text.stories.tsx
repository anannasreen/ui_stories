import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './index';

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
        },
        variant: {
            control: 'select',
            options: [
                'heading-display',
                'heading-title',
                'heading-h1',
                'heading-h2',
                'heading-h3',
                'heading-h4',
                'heading-h5',
                'heading-h6',
                'body-xxl-regular',
                'body-xxl-med',
                'body-xxl-bold',
                'body-xl-regular',
                'body-xl-med',
                'body-xl-bold',
                'body-lg-regular',
                'body-lg-med',
                'body-lg-bold',
                'body-md-regular',
                'body-md-med',
                'body-md-bold',
                'body-sm-regular',
                'body-sm-med',
                'body-sm-bold',
                'body-sm-md-upper-case',
                'body-xs-regular',
            ],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default Story
export const Default: Story = {
    args: {
        children: 'Default text will use body-lg-regular variant',
    },
};

// Heading Variants
export const HeadingDisplay: Story = {
    args: {
        variant: 'heading-display',
        children: 'Display Heading',
        as: 'h1',
    },
};

export const HeadingTitle: Story = {
    args: {
        variant: 'heading-title',
        children: 'Title Heading',
        as: 'h1',
    },
};

export const HeadingH1: Story = {
    args: {
        variant: 'heading-h1',
        children: 'Heading 1',
        as: 'h1',
    },
};

export const HeadingH2: Story = {
    args: {
        variant: 'heading-h2',
        children: 'Heading 2',
        as: 'h2',
    },
};

export const HeadingH3: Story = {
    args: {
        variant: 'heading-h3',
        children: 'Heading 3',
        as: 'h3',
    },
};

export const HeadingH4: Story = {
    args: {
        variant: 'heading-h4',
        children: 'Heading 4',
        as: 'h4',
    },
};

export const HeadingH5: Story = {
    args: {
        variant: 'heading-h5',
        children: 'Heading 5',
        as: 'h5',
    },
};

export const HeadingH6: Story = {
    args: {
        variant: 'heading-h6',
        children: 'Heading 6',
        as: 'h6',
    },
};

// Body XXL Variants
export const BodyXXLRegular: Story = {
    args: {
        variant: 'body-xxl-regular',
        children: 'Body XXL Regular Text',
        as: 'p',
    },
};

export const BodyXXLMedium: Story = {
    args: {
        variant: 'body-xxl-med',
        children: 'Body XXL Medium Text',
        as: 'p',
    },
};

export const BodyXXLBold: Story = {
    args: {
        variant: 'body-xxl-bold',
        children: 'Body XXL Bold Text',
        as: 'p',
    },
};

// Body XL Variants
export const BodyXLRegular: Story = {
    args: {
        variant: 'body-xl-regular',
        children: 'Body XL Regular Text',
        as: 'p',
    },
};

export const BodyXLMedium: Story = {
    args: {
        variant: 'body-xl-med',
        children: 'Body XL Medium Text',
        as: 'p',
    },
};

export const BodyXLBold: Story = {
    args: {
        variant: 'body-xl-bold',
        children: 'Body XL Bold Text',
        as: 'p',
    },
};

// Body Large Variants
export const BodyLargeRegular: Story = {
    args: {
        variant: 'body-lg-regular',
        children: 'Body Large Regular Text',
        as: 'p',
    },
};

export const BodyLargeMedium: Story = {
    args: {
        variant: 'body-lg-med',
        children: 'Body Large Medium Text',
        as: 'p',
    },
};

export const BodyLargeBold: Story = {
    args: {
        variant: 'body-lg-bold',
        children: 'Body Large Bold Text',
        as: 'p',
    },
};

// Body Medium Variants
export const BodyMediumRegular: Story = {
    args: {
        variant: 'body-md-regular',
        children: 'Body Medium Regular Text',
        as: 'p',
    },
};

export const BodyMediumMedium: Story = {
    args: {
        variant: 'body-md-med',
        children: 'Body Medium Medium Text',
        as: 'p',
    },
};

export const BodyMediumBold: Story = {
    args: {
        variant: 'body-md-bold',
        children: 'Body Medium Bold Text',
        as: 'p',
    },
};

// Body Small Variants
export const BodySmallRegular: Story = {
    args: {
        variant: 'body-sm-regular',
        children: 'Body Small Regular Text',
        as: 'p',
    },
};

export const BodySmallMedium: Story = {
    args: {
        variant: 'body-sm-med',
        children: 'Body Small Medium Text',
        as: 'p',
    },
};

export const BodySmallBold: Story = {
    args: {
        variant: 'body-sm-bold',
        children: 'Body Small Bold Text',
        as: 'p',
    },
};

export const BodySmallUppercase: Story = {
    args: {
        variant: 'body-sm-md-upper-case',
        children: 'Body Small Uppercase Text',
        as: 'p',
    },
};

// Body XS Variant
export const BodyXSRegular: Story = {
    args: {
        variant: 'body-xs-regular',
        children: 'Body XS Regular Text',
        as: 'p',
    },
};
