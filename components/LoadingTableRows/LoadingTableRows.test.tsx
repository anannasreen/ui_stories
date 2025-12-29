import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { LoadingTableRows } from '.';

describe('LoadingTableRows', () => {
    it('renders correct number of rows', () => {
        render(
            <table>
                <tbody>
                    <LoadingTableRows rows={3} columns={4} />
                </tbody>
            </table>,
        );

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3);
    });

    it('renders rows with correct colspan', () => {
        render(
            <table>
                <tbody>
                    <LoadingTableRows rows={2} columns={5} />
                </tbody>
            </table>,
        );

        const cells = screen.getAllByRole('cell');
        cells.forEach((cell) => {
            expect(cell).toHaveAttribute('colspan', '5');
        });
    });

    it('renders nothing when rows is 0', () => {
        render(
            <table>
                <tbody>
                    <LoadingTableRows rows={0} columns={3} />
                </tbody>
            </table>,
        );

        const rows = screen.queryAllByRole('row');
        expect(rows).toHaveLength(0);
    });
});
