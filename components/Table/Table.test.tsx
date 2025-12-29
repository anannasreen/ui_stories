import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table, TableCell, TableHeaderCell, TableRow } from '.';

describe('Table', () => {
    describe('Table Component', () => {
        it('should render with basic props', () => {
            render(
                <Table data-testid="table" width={500}>
                    <tbody>
                        <tr>
                            <td>Content</td>
                        </tr>
                    </tbody>
                </Table>,
            );

            const table = screen.getByTestId('table');
            expect(table).toBeInTheDocument();
            expect(table).toHaveStyle('width: 500px');
            expect(table).toHaveStyle('border-collapse: collapse');
        });

        it('should forward ref', () => {
            const ref = React.createRef<HTMLTableElement>();
            render(<Table innerRef={ref} data-testid="table" />);

            expect(ref.current).toBe(screen.getByTestId('table'));
        });
    });

    describe('TableHeaderCell Component', () => {
        it('should render with correct default styles', () => {
            render(<TableHeaderCell data-testid="header-cell">Header</TableHeaderCell>);

            const cell = screen.getByTestId('header-cell');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveStyle('font-weight: normal');
            expect(cell).toHaveStyle('color: rgb(255, 255, 255)');
            expect(cell).toHaveStyle('vertical-align: middle');
            expect(cell).toHaveStyle('text-align: center');
            expect(cell).toHaveStyle('border: 1px solid white');
        });

        it('should merge custom styles with defaults', () => {
            render(
                <TableHeaderCell data-testid="header-cell" style={{ padding: '10px' }}>
                    Header
                </TableHeaderCell>,
            );

            const cell = screen.getByTestId('header-cell');
            expect(cell).toHaveStyle('padding: 10px');
        });
    });

    describe('TableCell Component', () => {
        it('should render with correct default styles', () => {
            render(<TableCell data-testid="cell">Content</TableCell>);

            const cell = screen.getByTestId('cell');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveStyle('padding: 4px');
            expect(cell).toHaveStyle('vertical-align: middle');
            expect(cell).toHaveStyle('border: 1px solid white');
        });

        it('should merge custom styles with defaults', () => {
            render(
                <TableCell data-testid="cell" style={{ backgroundColor: 'rgb(255, 0, 0)' }}>
                    Content
                </TableCell>,
            );

            const cell = screen.getByTestId('cell');
            expect(cell).toHaveStyle('background-color: rgb(255, 0, 0)');
            expect(cell).toHaveStyle('padding: 4px');
        });
    });

    describe('TableRow Component', () => {
        it('should render basic row without actions', () => {
            render(
                <TableRow data-testid="row">
                    <td>Content</td>
                </TableRow>,
            );

            const row = screen.getByTestId('row');
            expect(row).toBeInTheDocument();
        });
    });
});
