import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EventTimeline, { TimelineEvent } from ".";
import PersonIcon from "@library/ui/stories/assets/timeline-person.svg";
import DoorIcon from "@library/ui/stories/assets/timeline-door.svg";
import WarningIcon from "@library/ui/stories/assets/timeline-warning.svg";

const meta: Meta<typeof EventTimeline> = {
  title: "Components/EventTimeline",
  component: EventTimeline,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#FFFFFF" }],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventTimeline>;

const defaultEvents: TimelineEvent[] = [
  {
    timestamp: "2025-03-07T12:07:30Z",
    title: "Valid badge",
    priority: "normal",
    icon: <WarningIcon />,
  },
  {
    timestamp: "2025-03-07T12:08:30Z",
    title: "Valid badge",
    priority: "normal",
    icon: <PersonIcon />,
  },
  {
    timestamp: "2025-03-07T12:09:30Z",
    title: "Valid badge",
    priority: "normal",
    icon: <DoorIcon />,
  },
  {
    timestamp: "2025-03-07T12:10:30Z",
    title: "Valid badge",
    priority: "normal",
    icon: <PersonIcon />,
  },
];

const statusEvents: TimelineEvent[] = [
  {
    timestamp: "2025-03-07T12:07:30Z",
    title: "System Online",
    priority: "normal",
    icon: <WarningIcon />,
  },
  {
    timestamp: "2025-03-07T12:08:30Z",
    title: "Memory Warning",
    priority: "high",
    icon: <DoorIcon />,
  },
  {
    timestamp: "2025-03-07T12:09:30Z",
    title: "Connection Error",
    priority: "critical",
    icon: <DoorIcon />,
  },
  {
    timestamp: "2025-03-07T12:10:30Z",
    title: "Backup Initiated",
    priority: "normal",
    icon: <PersonIcon />,
  },
];

const eventsWithImages: TimelineEvent[] = [
  {
    timestamp: "2025-03-07T12:07:30Z",
    title: "Valid badge",
    priority: "normal",
    icon: <PersonIcon />,
    imageUrl:
      "https://www.sterlingbackcheck.ca/wp-content/uploads/2019/12/CA_Website_Verifiable_ID_Badges_701x423.jpg",
  },
  {
    timestamp: "2025-03-07T12:08:30Z",
    title: "Person Traversal",
    priority: "high",
    icon: <WarningIcon />,
    imageUrl:
      "https://www.researchgate.net/publication/372367107/figure/fig3/AS:11431281174855956@1689384831037/Person-inside-restricted-zone.jpg",
  },
  {
    timestamp: "2025-03-07T12:09:30Z",
    title: "Gun Detected",
    priority: "critical",
    icon: <DoorIcon />,
    imageUrl:
      "https://nextbrain.ca/wp-content/uploads/2024/08/AI-Detection-of-Weapons-and-Violence.png.webp",
  },
  {
    timestamp: "2025-03-07T12:10:30Z",
    title: "Tailgater Detected",
    priority: "high",
    icon: <WarningIcon />,
    imageUrl:
      "https://www.researchgate.net/publication/372367107/figure/fig3/AS:11431281174855956@1689384831037/Person-inside-restricted-zone.jpg",
  },
];

const singleEvent: TimelineEvent[] = [
  {
    timestamp: "2025-03-07T12:07:30Z",
    title: "Task Completed",
    priority: "normal",
    icon: <PersonIcon />,
  },
];

export const Default: Story = {
  args: {
    events: defaultEvents,
  },
};

export const WithDescriptions: Story = {
  args: {
    events: statusEvents,
  },
};

export const SingleEvent: Story = {
  args: {
    events: singleEvent,
  },
};

export const ManyEvents: Story = {
  args: {
    events: [...statusEvents, ...defaultEvents],
  },
};

export const WithImages: Story = {
  args: {
    events: eventsWithImages,
  },
};
