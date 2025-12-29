import type { Meta, StoryObj } from "@storybook/react";
import { ListViewItem } from ".";
import ThumbnailImage from "@library/ui/stories/assets/images/Thumbnail.png";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta = {
  title: "Components/ListViewItem",
  component: ListViewItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ListViewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Tailgating",
    status: "inProgress",
    priority: "normal",
    location: "Union Square Office, Las Vegas, Nevada",
    timestamp: "2025-02-06T12:36:43",
    camera: "Camera 1",
    onClick: action("Default item clicked"),
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    imageSrc: ThumbnailImage,
  },
};

export const WithHighPriority: Story = {
  args: {
    ...Default.args,
    priority: "high",
    title: "High Priority Alert",
    onClick: action("High priority item clicked"),
    imageSrc: ThumbnailImage,
  },
};

export const WithCriticalPriority: Story = {
  args: {
    ...Default.args,
    priority: "critical",
    title: "Critical Alert",
    onClick: action("Critical priority item clicked"),
  },
};

export const WithClicks: Story = {
  args: {
    ...Default.args,
    onClick: action("ListViewItem clicked"),
    imageSrc: ThumbnailImage,
  },
};

export const WithLongText: Story = {
  args: {
    ...Default.args,
    title: "Very Long Title With Overflowing Content",
    location:
      "Union Square Office Building, 123 Main Street, San Francisco, CA 94105, Floor 23, Suite 2301",
    camera: "Security Camera 12 - North East Corner Hallway Entrance",
    onClick: action("Long text item clicked"),
    imageSrc: ThumbnailImage,
  },
};

export const ManyEvents = {
  render: () => {
    return (
      <div>
        <ListViewItem {...Default.args} />
        <ListViewItem {...WithImage.args} />
        <ListViewItem {...WithHighPriority.args} />
        <ListViewItem {...WithCriticalPriority.args} />
        <ListViewItem {...WithClicks.args} />
        <ListViewItem {...WithLongText.args} />
      </div>
    );
  },
};
