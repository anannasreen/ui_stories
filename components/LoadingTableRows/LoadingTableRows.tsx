import React from 'react';
import css from './LoadingTableRows.module.scss';

type PropsType = {
    /** Number of rows to display */
    rows: number;
    /** Number of columns to display */
    columns: number;
};

/**
 * LoadingTableRows component provides a loading skeleton for table rows.
 *
 * ```
 * <LoadingTableRows rows={5} columns={3} />
 * ```
 */
export const LoadingTableRows = ({ rows, columns }: PropsType) => {
    return (
        <>
            {Array.from(new Array(rows)).map((_, index) => (
                <tr className={css.rowSkeleton} key={index}>
                    <td colSpan={columns} />
                </tr>
            ))}
        </>
    );
};
