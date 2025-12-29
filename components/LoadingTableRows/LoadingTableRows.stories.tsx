import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingTableRows } from './LoadingTableRows';

const meta: Meta<typeof LoadingTableRows> = {
    title: 'Components/LoadingTableRows',
    component: LoadingTableRows,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingTableRows>;

export const Default: Story = {
    render: () => (
        <div style={{ marginBottom: '2rem' }}>
            <h3>Default (5x4)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <LoadingTableRows rows={5} columns={4} />
                </tbody>
            </table>
        </div>
    ),
};

export const SingleRow: Story = {
    render: () => (
        <div style={{ marginBottom: '2rem' }}>
            <h3>Single row (1x4)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <LoadingTableRows rows={1} columns={4} />
                </tbody>
            </table>
        </div>
    ),
};

export const ManyColumns: Story = {
    render: () => (
        <div style={{ marginBottom: '2rem' }}>
            <h3>Many columns (3x8)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <LoadingTableRows rows={3} columns={8} />
                </tbody>
            </table>
        </div>
    ),
};

export const ManyRows: Story = {
    render: () => (
        <div style={{ marginBottom: '2rem' }}>
            <h3>Many rows (10x4)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <LoadingTableRows rows={10} columns={4} />
                </tbody>
            </table>
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <>
            <div style={{ marginBottom: '2rem' }}>
                <h3>Small Table (2x3)</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <LoadingTableRows rows={2} columns={3} />
                    </tbody>
                </table>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3>Medium Table (5x4)</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <LoadingTableRows rows={5} columns={4} />
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Large Table (8x6)</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <LoadingTableRows rows={8} columns={6} />
                    </tbody>
                </table>
            </div>
        </>
    ),
};
