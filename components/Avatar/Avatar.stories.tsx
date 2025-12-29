import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Avatar from ".";
import avatarImage from "@library/ui/stories/assets/images/avatar.png";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: avatarImage,
    username: "John Doe",
    size: "xl",
  },
};

export const WithInitials: Story = {
  args: {
    username: "John Doe",
    size: "xl",
  },
};

export const Small: Story = {
  args: {
    username: "Small Size",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    username: "Medium Size",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    username: "Large Size",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    username: "Extra Large",
    size: "xl",
  },
};
