import React, { HTMLProps, useMemo } from 'react';
import {
    ColumnDef,
    ColumnHelper,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { Text } from '../Text';
import styles from './StatusHistory.module.scss';

export interface Props<T> extends Omit<HTMLProps<HTMLTableElement>, 'data'> {
    /** The data to display in the table. */
    data?: T[] | null;
    /** Function that returns column definitions. */
    columns: (column: ColumnHelper<T>) => ColumnDef<T, string>[];
    /** Whether the table should grow to fill available horizontal space. */
    grow?: boolean;
}

/**
 * StatusHistory component displays a table of status history.
 *
 * ```
 * <StatusHistory
 *   data={[
 *     { id: 1, status: 'Active' },
 *     { id: 2, status: 'Inactive' },
 *   ]}
 *   columns={(column) => [
 *     column.id('id'),
 *     column.id('status'),
 *   ]}
 *   grow={true}
 * />
 * ```
 */
export function StatusHistory<T>({ data, columns: createColumns, grow, ...etc }: Props<T>) {
    const columns = useMemo(() => {
        const helper = createColumnHelper<T>();
        return createColumns(helper);
    }, [createColumns]);

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            minSize: 0,
            size: 0,
        },
    });

    return (
        <div className={styles.statusWrapper}>
            <table
                className={clsx(styles.statusTable)}
                role="table"
                {...etc}
                style={{
                    width: grow ? '100%' : 'auto',
                    minWidth: table.getCenterTotalSize(),
                    ...etc.style,
                }}
            >
                <colgroup>
                    {table.getAllLeafColumns().map((column) => (
                        <col key={column.id} span={1} style={{ width: column.getSize() || 'auto' }} />
                    ))}
                </colgroup>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} role="row">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className={styles.headerCell} role="columnheader">
                                    <Text variant="body-sm-med">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </Text>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} role="row">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className={styles.cell} role="cell">
                                    <Text variant="body-sm-med">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Text>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatusHistory;
