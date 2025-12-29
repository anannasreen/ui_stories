import type { StoryObj, Meta } from '@storybook/react';
import React from 'react';
import { EventCard } from './EventCard';
import EventInfo from '../EventInfo';
import { action } from '@storybook/addon-actions';
import DoorIcon from '../../stories/assets/timeline-door.svg';
import WarningIcon from '../../stories/assets/timeline-warning.svg';
import PersonIcon from '../../stories/assets/timeline-person.svg';

// Fixed test times for events
const EVENT_START = '2025-01-15T12:36:00Z';
const EVENT_END = '2025-01-15T12:38:00Z';
const EVENT_1 = '2025-01-15T12:40:10Z';
const EVENT_2 = '2025-01-15T12:42:20Z';
const EVENT_3 = '2025-01-15T12:43:30Z';

const defaultEvents = [
    {
        time: EVENT_1,
        icon: <DoorIcon />,
        title: 'Door Opened',
    },
    {
        time: EVENT_2,
        icon: <WarningIcon />,
        title: 'Motion Detected',
    },
    {
        time: EVENT_3,
        icon: <PersonIcon />,
        title: 'Person Detected',
    },
];

const defaultArgs = {
    title: 'Motion Detected in the left side of the main area',
    location: 'Main Entrance area to the left',
    additionalInfo: 'Multiple security events detected in the main entrance area',
    sourceDevice: 'Camera 1',
    timestamp: '2024-01-15T12:36:00Z',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoStartTime: EVENT_START,
    videoEndTime: EVENT_END,
};

/**
 * The EventCard component displays event information with video previews, details, and status indicators.
 * It uses a compound component pattern for flexible composition of its parts.
 */
const meta = {
    title: 'Components/EventCard',
    component: EventCard,
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'large'],
            description: 'Size variant of the event card',
            defaultValue: 'large',
            table: {
                category: 'Card',
            },
        },
        priority: {
            control: 'select',
            options: ['normal', 'high', 'critical'],
            description: 'Priority level of the event',
            defaultValue: 'normal',
            table: {
                category: 'Card',
            },
        },
    },
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#fff' },
                { name: 'dark', value: '#1a1a1a' },
            ],
        },
        docs: {
            description: {
                component:
                    'A versatile card component for displaying event information with video previews, details, and status indicators. Uses compound components for flexible composition.',
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '360px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof EventCard>;

/**
 * Default story showing a basic event card with all subcomponents
 */
export const Default: Story = {
    args: {
        priority: 'normal',
        size: 'large',
    },
    render: (args) => (
        <EventCard {...args}>
            <EventCard.Video
                videoSrc={defaultArgs.videoSrc}
                startTime={defaultArgs.videoStartTime}
                endTime={defaultArgs.videoEndTime}
                events={defaultEvents}
            />
            <EventCard.Content>
                <EventCard.Header
                    title={defaultArgs.title}
                    onOptionsClick={action('options-clicked')}
                    priority={args.priority}
                    sourceDevice={defaultArgs.sourceDevice}
                />
                <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
            </EventCard.Content>
        </EventCard>
    ),
};

/**
 * Story showing a card with a single timeline event
 */
export const WithSingleEvent: Story = {
    args: {
        priority: 'normal',
        size: 'large',
    },
    render: (args) => (
        <EventCard {...args}>
            <EventCard.Video
                videoSrc={defaultArgs.videoSrc}
                startTime={defaultArgs.videoStartTime}
                endTime={defaultArgs.videoEndTime}
                events={[defaultEvents[0]]}
            />
            <EventCard.Content>
                <EventCard.Header
                    title={defaultArgs.title}
                    onOptionsClick={action('options-clicked')}
                    priority={args.priority}
                    sourceDevice={defaultArgs.sourceDevice}
                />
                <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
            </EventCard.Content>
        </EventCard>
    ),
};

/**
 * Story showing a card with multiple timeline events and a description
 */
export const WithMultipleEvents: Story = {
    args: {
        priority: 'normal',
        size: 'large',
    },
    render: (args) => (
        <EventCard {...args}>
            <EventCard.Video
                videoSrc={defaultArgs.videoSrc}
                startTime={defaultArgs.videoStartTime}
                endTime={defaultArgs.videoEndTime}
                events={defaultEvents}
            />
            <EventCard.Content>
                <EventCard.Header
                    title={defaultArgs.title}
                    onOptionsClick={action('options-clicked')}
                    priority={args.priority}
                    sourceDevice={defaultArgs.sourceDevice}
                />
                <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                <EventCard.Description>
                    <EventInfo
                        text="Multiple security events detected in sequence"
                        icon={<WarningIcon />}
                        muted={true}
                    />
                </EventCard.Description>
                <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
            </EventCard.Content>
        </EventCard>
    ),
};

/**
 * Story showing different size variants of the card
 */
export const SizeVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <EventCard priority="normal" size="small">
                <EventCard.Video
                    videoSrc={defaultArgs.videoSrc}
                    startTime={defaultArgs.videoStartTime}
                    endTime={defaultArgs.videoEndTime}
                    events={defaultEvents}
                />
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultArgs.title}
                        onOptionsClick={action('options-clicked')}
                        priority="normal"
                        sourceDevice={defaultArgs.sourceDevice}
                    />
                    <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                    <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>

            <EventCard priority="normal" size="large">
                <EventCard.Video
                    videoSrc={defaultArgs.videoSrc}
                    startTime={defaultArgs.videoStartTime}
                    endTime={defaultArgs.videoEndTime}
                    events={defaultEvents}
                />
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultArgs.title}
                        onOptionsClick={action('options-clicked')}
                        priority="normal"
                        sourceDevice={defaultArgs.sourceDevice}
                    />
                    <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                    <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>
        </div>
    ),
};

/**
 * Story showing different priority variants of the card
 */
export const PriorityVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <EventCard priority="normal" size="large">
                <EventCard.Video
                    videoSrc={defaultArgs.videoSrc}
                    startTime={defaultArgs.videoStartTime}
                    endTime={defaultArgs.videoEndTime}
                    events={defaultEvents}
                />
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultArgs.title}
                        onOptionsClick={action('options-clicked')}
                        priority="normal"
                        sourceDevice={defaultArgs.sourceDevice}
                    />
                    <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                    <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>

            <EventCard priority="high" size="large">
                <EventCard.Video
                    videoSrc={defaultArgs.videoSrc}
                    startTime={defaultArgs.videoStartTime}
                    endTime={defaultArgs.videoEndTime}
                    events={defaultEvents}
                />
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultArgs.title}
                        onOptionsClick={action('options-clicked')}
                        priority="high"
                        sourceDevice={defaultArgs.sourceDevice}
                    />
                    <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                    <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>

            <EventCard priority="critical" size="large">
                <EventCard.Video
                    videoSrc={defaultArgs.videoSrc}
                    startTime={defaultArgs.videoStartTime}
                    endTime={defaultArgs.videoEndTime}
                    events={defaultEvents}
                />
                <EventCard.Content>
                    <EventCard.Header
                        title={defaultArgs.title}
                        onOptionsClick={action('options-clicked')}
                        priority="critical"
                        sourceDevice={defaultArgs.sourceDevice}
                    />
                    <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                    <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
                </EventCard.Content>
            </EventCard>
        </div>
    ),
};

/**
 * Story showing a card without a video section
 */
export const WithoutVideo: Story = {
    args: {
        priority: 'normal',
        size: 'large',
    },
    render: (args) => (
        <EventCard {...args}>
            <EventCard.Content>
                <EventCard.Header
                    title={defaultArgs.title}
                    onOptionsClick={action('options-clicked')}
                    priority={args.priority}
                    sourceDevice={defaultArgs.sourceDevice}
                />
                <EventCard.Details location={defaultArgs.location} additionalInfo={defaultArgs.additionalInfo} />
                <EventCard.Footer timestamp={defaultArgs.timestamp} status="open" />
            </EventCard.Content>
        </EventCard>
    ),
};
