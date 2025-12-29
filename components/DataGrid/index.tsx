import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    AccessorFn,
    AccessorFnColumnDef,
    AccessorKeyColumnDef,
    DeepKeys,
    DeepValue,
    DisplayColumnDef,
    GroupColumnDef,
    IdentifiedColumnDef,
    RowData,
} from '@tanstack/react-table';
import React, { HTMLProps, useMemo } from 'react';
import clsx from 'clsx';
import Progress from '../Progress';
import css from './DataGrid.module.scss';
import SortIcon from './SortIcon';

// TODO: replace these types with upstream types once this is merged:
// https://github.com/TanStack/table/pull/5999
/**
 * Utility type that extracts the return type of an accessor function or the value type from a deep key path.
 */
type AccessorValue<TData, TAccessor extends AccessorFn<TData> | DeepKeys<TData>> =
    TAccessor extends AccessorFn<TData, infer TReturn>
        ? TReturn
        : TAccessor extends DeepKeys<TData>
          ? DeepValue<TData, TAccessor>
          : never;

/**
 * Helper object that provides methods for creating column definitions with proper typing.
 * Used within the columns builder function to create properly typed column definitions.
 */
export type ColumnHelper<TData extends RowData> = {
    accessor: <TAccessor extends AccessorFn<TData> | DeepKeys<TData>>(
        accessor: TAccessor,
        column: TAccessor extends AccessorFn<TData>
            ? DisplayColumnDef<TData, AccessorValue<TData, TAccessor>>
            : IdentifiedColumnDef<TData, AccessorValue<TData, TAccessor>>,
    ) => TAccessor extends AccessorFn<TData>
        ? AccessorFnColumnDef<TData, AccessorValue<TData, TAccessor>>
        : AccessorKeyColumnDef<TData, AccessorValue<TData, TAccessor>>;
    display: (column: DisplayColumnDef<TData>) => DisplayColumnDef<TData, unknown>;
    group: (column: GroupColumnDef<TData>) => GroupColumnDef<TData, unknown>;
};

/**
 * Function type for creating column definitions with type-safe helper.
 * Takes a column helper and returns an array of column definitions.
 */
export type ColumnsBuilder<T> = (helper: ColumnHelper<T>) => ColumnDef<T, any>[];

interface Props<T> extends Omit<HTMLProps<HTMLTableElement>, 'data'> {
    /** Data array to be displayed in the grid */
    data?: T[] | null;
    /** Column definitions for the table.

     A ColumnHelper will be provided in the function argument to ease column definition creation. */
    columns: ColumnsBuilder<T>;
    /** Initial sorting configuration for the grid */
    initialSort?: SortingState;
    /** Message to display when data is loading. Set to false to hide. */
    loadingMessage?: string | null | false;
    /** Message to display when there is no data */
    emptyMessage?: string;
    /** Optional click handler for row interactions */
    onRowClick?: (item: T) => any;
    /** Whether the table should grow to fill available horizontal space. */
    grow?: boolean;
}

/**
 * DataGrid component for displaying tabular data with sorting, row interaction, and customization options.
 *
 * ```tsx
 * // Basic usage with array data
 * const data = [
 *   { id: 1, name: 'Item 1', value: 100 },
 *   { id: 2, name: 'Item 2', value: 200 }
 * ];
 *
 * const columns = (columnHelper) => [
 *   columnHelper.accessor('id', { header: 'ID' }),
 *   columnHelper.accessor('name', { header: 'Name' }),
 *   columnHelper.accessor('value', { header: 'Value' })
 * ];
 *
 * <DataGrid
 *   data={data}
 *   columns={columns}
 *   initialSort={[{ id: 'name', desc: false }]}
 * />
 * ```
 */
export default function DataGrid<T>({
    data,
    columns: createColumns,
    initialSort = [],
    className,
    style,
    loadingMessage,
    emptyMessage = 'No results.',
    onRowClick,
    grow,
    ...etc
}: Props<T>) {
    const [sorting, setSorting] = React.useState<SortingState>(initialSort);

    const columns = useMemo(() => {
        const helper = createColumnHelper<T>();
        return createColumns(helper);
    }, [createColumns]);

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        state: { sorting },
        defaultColumn: {
            // Columns should be autosized by default
            minSize: 0,
            size: 0,
        },
    });

    const noRows = table.getRowModel().rows?.length === 0;

    return (
        <table
            className={clsx(className, css.table)}
            {...etc}
            style={{
                width: grow ? '100%' : 'auto',
                minWidth: table.getCenterTotalSize(),
                ...style,
            }}
        >
            {/* Use HTML col elements to define column-level styling */}
            <colgroup>
                {table.getAllLeafColumns().map((column) => (
                    <col key={column.id} span={1} style={{ width: column.getSize() || 'auto' }} />
                ))}
            </colgroup>

            <thead>
                {table.getHeaderGroups().map((group) => (
                    <tr key={group.id}>
                        {group.headers.map((header) => (
                            <th key={header.id}>
                                <button
                                    className={clsx(css.headerButton)}
                                    disabled={!header.column.getCanSort()}
                                    type="button"
                                    onClick={header.column.getToggleSortingHandler()}
                                    title={
                                        header.column.getCanSort()
                                            ? header.column.getNextSortingOrder() === 'asc'
                                                ? 'Sort ascending'
                                                : header.column.getNextSortingOrder() === 'desc'
                                                  ? 'Sort descending'
                                                  : 'Clear sort'
                                            : undefined
                                    }
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && (
                                        <SortIcon
                                            direction={
                                                header.column.getIsSorted() || header.column.getNextSortingOrder()
                                            }
                                            className={header.column.getIsSorted() ? css.activeSort : css.enableSort}
                                        />
                                    )}
                                </button>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {noRows || loadingMessage ? (
                    <tr>
                        <td colSpan={columns.length}>
                            {loadingMessage ? (
                                <div className={css.loading}>
                                    <Progress />
                                    {loadingMessage}
                                </div>
                            ) : (
                                <div className={css.empty}>{emptyMessage}</div>
                            )}
                        </td>
                    </tr>
                ) : (
                    table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                            onClick={() => onRowClick?.(row.original)}
                            className={clsx(!!onRowClick && css.interactive)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
