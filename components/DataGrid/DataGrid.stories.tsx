import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataGrid from '.';

type Person = {
    id: number;
    firstName: string;
    lastName: string;
    age?: number;
    visits: number;
    status: string;
};

const sampleData: Person[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        visits: 10,
        status: 'Active',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        visits: 15,
        status: 'Inactive',
    },
    {
        id: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        age: 45,
        visits: 20,
        status: 'Active',
    },
];

const meta: Meta<typeof DataGrid> = {
    title: 'Components/DataGrid',
    component: DataGrid,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        data: {
            description: 'Array of data items to display in the grid',
        },
        columns: {
            description: 'Function that returns column definitions using the provided column helper',
        },
        initialSort: {
            description: 'Initial sorting state for the grid',
        },
        loadingMessage: {
            description: 'Message to display when data is loading',
            control: 'text',
        },
        emptyMessage: {
            description: 'Message to display when there is no data',
            control: 'text',
        },
        onRowClick: {
            description: 'Callback function when a row is clicked',
        },
        grow: {
            description: 'Whether the table should grow to fill available space',
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DataGrid<Person>>;

const createBasicColumns = (columnHelper: any) => [
    columnHelper.accessor('firstName', {
        header: 'First Name',
    }),
    columnHelper.accessor('lastName', {
        header: 'Last Name',
    }),
    columnHelper.accessor('age', {
        header: 'Age',
    }),
    columnHelper.accessor('visits', {
        header: 'Visits',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
    }),
];

export const Default: Story = {
    args: {
        data: sampleData,
        columns: createBasicColumns,
    },
};

export const WithInitialSort: Story = {
    args: {
        data: sampleData,
        columns: createBasicColumns,
        initialSort: [{ id: 'age', desc: true }],
    },
};

export const Loading: Story = {
    args: {
        data: [],
        columns: createBasicColumns,
        loadingMessage: 'Loading data...',
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns: createBasicColumns,
        emptyMessage: 'No data available',
    },
};

export const WithRowClick: Story = {
    args: {
        data: sampleData,
        columns: createBasicColumns,
        onRowClick: (item: Person) => alert(`Clicked on ${item.firstName} ${item.lastName}`),
    },
};

export const GrowToFit: Story = {
    args: {
        data: sampleData,
        columns: createBasicColumns,
        grow: true,
    },
    parameters: {
        layout: 'padded',
    },
};

export const CustomColumns: Story = {
    args: {
        data: sampleData,
        columns: (columnHelper) => [
            columnHelper.accessor((p) => p.firstName, {
                header: 'First Name',
                cell: (info) => <strong>{info.getValue()}</strong>,
            }),
            columnHelper.accessor('lastName', {
                header: 'Last Name',
                cell: (info) => <em>{info.getValue()}</em>,
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (info) => (
                    <span
                        style={{
                            color: info.getValue() === 'Active' ? 'green' : 'red',
                            fontWeight: 'bold',
                        }}
                    >
                        {info.getValue()}
                    </span>
                ),
            }),
        ],
    },
};
