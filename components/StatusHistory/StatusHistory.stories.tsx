import type { Meta, StoryObj } from '@storybook/react';
import { ColumnHelper } from '@tanstack/react-table';
import StatusHistory from '.';

interface StatusItem {
    time: string;
    author: string;
    action: string;
    details: string;
}

const createDefaultColumns = (columnHelper: ColumnHelper<StatusItem>) => [
    columnHelper.accessor('author', {
        header: 'Author',
        size: 60,
    }),
    columnHelper.accessor('action', {
        header: 'Action',
        size: 60,
    }),
    columnHelper.accessor('details', {
        header: 'Details',
        size: 84,
    }),
    columnHelper.accessor('time', {
        header: 'Time',
        size: 96,
    }),
];

const singleStatusData: StatusItem[] = [
    {
        time: '8:31:14 AM PDT 20 Mar 2025',
        author: 'Joseph',
        action: 'Open',
        details: 'Escalated by Cobalt',
    },
];

const multipleStatusData: StatusItem[] = [
    {
        time: '8:31:14 AM PDT 20 Mar 2025',
        author: 'Joseph',
        action: 'Open',
        details: 'Escalated by Cobalt',
    },
    {
        time: '8:35:22 AM PDT 20 Mar 2025',
        author: 'Alex',
        action: 'In-progress',
        details: 'Escalated by Cobalt',
    },
    {
        time: '8:42:10 AM PDT 20 Mar 2025',
        author: 'Felix',
        action: 'on-hold',
        details: 'Escalated by Cobalt',
    },
    {
        time: '8:45:30 AM PDT 20 Mar 2025',
        author: 'Angelica P.',
        action: 'Resolved',
        details: 'Escalated by Cobalt',
    },
];

const meta = {
    title: 'Components/StatusHistory',
    component: StatusHistory,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StatusHistory>;

export default meta;

type DefaultStory = StoryObj<typeof StatusHistory<StatusItem>>;

export const SingleStatus: DefaultStory = {
    args: {
        columns: createDefaultColumns,
        data: singleStatusData,
        grow: true,
    },
};

export const MultipleStatus: DefaultStory = {
    args: {
        columns: createDefaultColumns,
        data: multipleStatusData,
        grow: true,
    },
};

export const CompactSingle: DefaultStory = {
    args: {
        columns: createDefaultColumns,
        data: singleStatusData,
        grow: false,
    },
};

export const CompactMultiple: DefaultStory = {
    args: {
        columns: createDefaultColumns,
        data: multipleStatusData,
        grow: false,
    },
};

export const CustomWidthSingle: DefaultStory = {
    args: {
        columns: createDefaultColumns,
        data: singleStatusData,
        grow: false,
        style: { width: '300px' },
    },
};

export const CustomWidthMultiple: DefaultStory = {
    args: {
        columns: createDefaultColumns,
        data: multipleStatusData,
        grow: false,
        style: { width: '300px' },
    },
};
