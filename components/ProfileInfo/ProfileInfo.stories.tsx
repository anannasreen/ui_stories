import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProfileInfo from ".";
import avatarImage from "../../stories/assets/images/avatar.png";

const meta: Meta<typeof ProfileInfo> = {
  title: "Components/ProfileInfo",
  component: ProfileInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProfileInfo>;

export const Default: Story = {
  args: {
    name: "Esther Howard",
    email: "esther@libraryai.com",
    imageSrc: avatarImage,
  },
};

export const AvatarOnly: Story = {
  args: {
    name: "Esther Howard",
    email: "esther@libraryai.com",
    imageSrc: avatarImage,
    showDetails: false,
  },
};

export const LongText: Story = {
  args: {
    name: "Esther Howard-Smith-Jones",
    email: "esther.howard.smith.jones@verylongdomain.libraryai.com",
    imageSrc: avatarImage,
  },
};

export const CustomWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: "Esther Howard",
    email: "esther.howard.smith.jones@verylongdomain.libraryai.com",
    imageSrc: avatarImage,
  },
};
