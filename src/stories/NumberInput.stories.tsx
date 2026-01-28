import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NumberInput from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

// Interactive wrapper component
const InteractiveNumberInput = (
  args: React.ComponentProps<typeof NumberInput>
) => {
  const [value, setValue] = useState<number | null>(args.value ?? null);

  return (
    <NumberInput
      {...args}
      value={value}
      onChange={(newValue, e) => {
        setValue(newValue);
        args.onChange?.(newValue, e);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "Number Input",
    placeholder: "Enter a number",
  },
};

export const WithValue: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "With Initial Value",
    value: 42,
  },
};

export const WithMinMax: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "With Min/Max",
    min: 0,
    max: 100,
    value: 50,
    helpText: "Enter a number between 0 and 100",
  },
};

export const WithSuffix: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "With Suffix",
    value: 100,
    suffix: "px",
    width: "120px",
  },
};

export const WithError: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "With Error",
    value: -1,
    error: "Please enter a positive number",
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "Disabled Input",
    value: 42,
    disabled: true,
  },
};

export const WithHelpText: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "With Help Text",
    helpText: "Enter your preferred quantity",
    placeholder: "Enter quantity",
  },
};

export const WithLearnMore: Story = {
  render: (args) => <InteractiveNumberInput {...args} />,
  args: {
    label: "With Learn More",
    learnMore: (
      <a href="#" style={{ fontSize: "12px" }}>
        Learn more
      </a>
    ),
    placeholder: "Enter value",
  },
};

export const States: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        width: "200px",
      }}
    >
      <InteractiveNumberInput label="Default" placeholder="Enter number" />
      <InteractiveNumberInput label="With Value" value={42} />
      <InteractiveNumberInput
        label="With Min/Max"
        min={0}
        max={100}
        value={50}
      />
      <InteractiveNumberInput label="With Suffix" value={100} suffix="px" />
      <InteractiveNumberInput
        label="With Error"
        value={-1}
        error="Invalid value"
      />
      <InteractiveNumberInput label="Disabled" value={42} disabled />
      <InteractiveNumberInput
        label="With Step"
        value={5}
        step={0.5}
        helpText="Step by 0.5"
      />
    </div>
  ),
};
