import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import VideoPlayer from './index';
import EventTimeline, { TimelineEvent } from '../EventTimeline';
import DoorIcon from '@cobalt/ui/stories/assets/timeline-door.svg';
import PersonIcon from '@cobalt/ui/stories/assets/timeline-person.svg';

const meta: Meta<typeof VideoPlayer> = {
    title: 'Components/VideoPlayer',
    component: VideoPlayer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof VideoPlayer> = (args) => <VideoPlayer {...args} />;

const START_TIME = '2025-03-07T11:59:30Z';
const END_TIME = '2025-03-07T12:09:26.474Z';

const timelineEvents: TimelineEvent[] = [
    {
        timestamp: '2025-03-07T12:00:30Z',
        icon: <DoorIcon />,
        title: 'Document Event',
    },
    {
        timestamp: '2025-03-07T12:02:30Z',
        icon: <PersonIcon />,
        title: 'Person Detected',
    },
    {
        timestamp: '2025-03-07T12:04:30Z',
        icon: <PersonIcon />,
        title: 'Person Detected',
    },
    {
        timestamp: '2025-03-07T12:05:30Z',
        icon: <PersonIcon />,
        title: 'Security Alert',
    },
    {
        timestamp: '2025-03-07T12:07:30Z',
        icon: <PersonIcon />,
        title: 'Person Detected',
    },
];

export const Default = Template.bind({});
Default.args = {
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoStartTime: START_TIME,
    videoEndTime: END_TIME,
    width: '800px',
    events: [
        {
            time: '2025-03-07T12:00:30Z',
            icon: <DoorIcon />,
            title: 'Document Event',
        },
        {
            time: '2025-03-07T12:02:30Z',
            icon: <PersonIcon />,
            title: 'Person Detected',
        },
        {
            time: '2025-03-07T12:04:30Z',
            icon: <PersonIcon />,
            title: 'Person Detected',
        },
        {
            time: '2025-03-07T12:05:30Z',
            icon: <PersonIcon />,
            title: 'Security Alert',
        },
        {
            time: '2025-03-07T12:07:30Z',
            icon: <PersonIcon />,
            title: 'Person Detected',
        },
    ],
};

export const WithoutEvents = Template.bind({});
WithoutEvents.args = {
    ...Default.args,
    events: [],
};

export const MinimalControls = Template.bind({});
MinimalControls.args = {
    ...Default.args,
    showTimestamps: false,
    showFullscreenButton: false,
};

export const PlayOnHover = Template.bind({});
PlayOnHover.args = {
    ...Default.args,
    playOnHover: true,
    showControls: false,
};

export const WithPacificTimeZone = Template.bind({});
WithPacificTimeZone.args = {
    ...Default.args,
    timezone: 'America/Los_Angeles',
};

export const WithUTCTimeZone = Template.bind({});
WithUTCTimeZone.args = {
    ...Default.args,
    timezone: 'UTC',
};

// New story that combines VideoPlayer with EventTimeline
const VideoPlayerWithTimeline = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleEventHover = (event: TimelineEvent) => {
        if (videoRef.current) {
            const eventTime = new Date(event.timestamp).getTime();
            const startTime = new Date(START_TIME).getTime();
            const seekTime = (eventTime - startTime) / 1000;

            if (seekTime >= 0 && seekTime <= videoRef.current.duration && videoRef.current.seek) {
                videoRef.current.seek(event.timestamp);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '800px' }}>
            <VideoPlayer
                {...Default.args}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                videoStartTime={START_TIME}
                ref={videoRef}
            />
            <EventTimeline events={timelineEvents} onEventMouseEnter={handleEventHover} style={{ width: '100%' }} />
        </div>
    );
};

export const WithEventTimeline = () => <VideoPlayerWithTimeline />;
