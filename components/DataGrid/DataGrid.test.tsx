import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import DataGrid, { ColumnsBuilder } from '.';

vi.mock('../Progress', () => ({
    default: () => <div data-testid="progress" />,
}));

interface TestData {
    id: number;
    name: string;
    age: number;
}

describe('DataGrid', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const testData: TestData[] = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
    ];

    const columns: ColumnsBuilder<TestData> = (columnHelper) => [
        columnHelper.accessor('name', {
            header: 'Name',
        }),
        columnHelper.accessor('age', {
            header: 'Age',
        }),
    ];

    it('renders table with data', () => {
        render(<DataGrid data={testData} columns={columns} />);

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('shows loading state with message', () => {
        render(<DataGrid data={[]} columns={columns} loadingMessage="Loading data..." />);

        expect(screen.getByText('Loading data...')).toBeInTheDocument();
        expect(screen.getByTestId('progress')).toBeInTheDocument();
    });

    it('shows empty message when no data', () => {
        render(<DataGrid data={[]} columns={columns} emptyMessage="No data available" />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('handles row click', async () => {
        const handleRowClick = vi.fn();
        render(<DataGrid data={testData} columns={columns} onRowClick={handleRowClick} />);

        const row = screen.getByText('Alice').closest('tr')!;
        row.click();
        expect(handleRowClick).toHaveBeenCalledWith(testData[0]);
    });

    it('handles sorting', async () => {
        render(<DataGrid data={testData} columns={columns} />);

        const nameHeader = screen.getByText('Name');
        nameHeader.click();

        const cells = screen.getAllByRole('cell');
        const names = cells.filter((cell) => ['Alice', 'Bob', 'Charlie'].includes(cell.textContent || ''));
        expect(names.map((cell) => cell.textContent)).toEqual(['Alice', 'Bob', 'Charlie']);

        nameHeader.click();
        const namesDesc = screen
            .getAllByRole('cell')
            .filter((cell) => ['Alice', 'Bob', 'Charlie'].includes(cell.textContent || ''));
        expect(namesDesc.map((cell) => cell.textContent)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('applies grow style when grow prop is true', () => {
        render(<DataGrid data={testData} columns={columns} grow />);

        const table = screen.getByRole('table');
        expect(table).toHaveStyle({ width: '100%' });
    });

    it('renders with initial sort state', () => {
        render(<DataGrid data={testData} columns={columns} initialSort={[{ id: 'name', desc: true }]} />);

        const cells = screen.getAllByRole('cell');
        const names = cells.filter((cell) => ['Alice', 'Bob', 'Charlie'].includes(cell.textContent || ''));
        expect(names.map((cell) => cell.textContent)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('renders column headers with sort buttons', () => {
        render(<DataGrid data={testData} columns={columns} />);

        const headers = screen.getAllByRole('button');
        expect(headers).toHaveLength(2);
        expect(headers[0]).toHaveTextContent('Name');
        expect(headers[1]).toHaveTextContent('Age');
    });

    it('handles null data gracefully', () => {
        render(<DataGrid data={null} columns={columns} />);
        expect(screen.getByText('No results.')).toBeInTheDocument();
    });
});
