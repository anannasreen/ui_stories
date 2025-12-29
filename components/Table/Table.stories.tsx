import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableCell, TableHeaderCell, TableRow } from './Table';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
    { id: 4, name: 'Alice Brown', age: 28, city: 'Houston' },
];

export const Default: Story = {
    render: () => (
        <Table>
            <thead>
                <tr>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Age</TableHeaderCell>
                    <TableHeaderCell>City</TableHeaderCell>
                </tr>
            </thead>
            <tbody>
                {sampleData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.city}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    ),
};

export const ZebraStriped: Story = {
    render: () => (
        <Table>
            <thead>
                <tr>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Age</TableHeaderCell>
                    <TableHeaderCell>City</TableHeaderCell>
                </tr>
            </thead>
            <tbody>
                {sampleData.map((row, index) => (
                    <TableRow key={row.id} zebraStriped={index % 2 === 1} style={{ color: 'grey' }}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.city}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    ),
};

export const WithActions: Story = {
    render: () => (
        <Table>
            <thead>
                <tr>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Age</TableHeaderCell>
                    <TableHeaderCell>City</TableHeaderCell>
                </tr>
            </thead>
            <tbody>
                {sampleData.map((row) => (
                    <TableRow
                        key={row.id}
                        deletable
                        editable
                        onDelete={() => alert(`Delete ${row.name}`)}
                        onEdit={() => alert(`Edit ${row.name}`)}
                    >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.city}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    ),
};

export const CustomWidth: Story = {
    render: () => (
        <Table width={800}>
            <thead>
                <tr>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Age</TableHeaderCell>
                    <TableHeaderCell>City</TableHeaderCell>
                </tr>
            </thead>
            <tbody>
                {sampleData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.city}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    ),
};

export const CustomStyling: Story = {
    render: () => (
        <Table style={{ borderCollapse: 'collapse', borderSpacing: 0 }}>
            <thead>
                <tr>
                    <TableHeaderCell style={{ padding: '12px' }}>ID</TableHeaderCell>
                    <TableHeaderCell style={{ padding: '12px' }}>Name</TableHeaderCell>
                    <TableHeaderCell style={{ padding: '12px' }}>Age</TableHeaderCell>
                    <TableHeaderCell style={{ padding: '12px' }}>City</TableHeaderCell>
                </tr>
            </thead>
            <tbody>
                {sampleData.map((row) => (
                    <TableRow key={row.id} style={{ transition: 'background-color 0.2s' }}>
                        <TableCell style={{ padding: '8px' }}>{row.id}</TableCell>
                        <TableCell style={{ padding: '8px' }}>{row.name}</TableCell>
                        <TableCell style={{ padding: '8px' }}>{row.age}</TableCell>
                        <TableCell style={{ padding: '8px' }}>{row.city}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    ),
};
