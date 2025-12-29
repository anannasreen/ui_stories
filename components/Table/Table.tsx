/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { IoIosRemoveCircleOutline as IconRemove } from "react-icons/io";
import { MdEdit as IconEdit } from "react-icons/md";
import styleVariables from "@library/ui/styles/constants.module.scss";

/**
 * Table component props
 */
type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /** Reference to the table element */
  innerRef?: React.Ref<HTMLTableElement>;
  /** Width of the table in pixels or CSS value */
  width?: number | string;
};

/**
 * TableHeaderCell component provides a styled header cell for tables.
 * Automatically applies styling for header cells with white text on sky blue background.
 */
export const TableHeaderCell: React.FC<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>
> = ({ style, ...props }) => (
  <th
    style={{
      ...(style || {}),
      fontWeight: "normal",
      color: "white",
      backgroundColor: styleVariables.skyBlue,
      verticalAlign: "middle",
      textAlign: "center",
      border: "1px solid white",
    }}
    {...props}
  />
);

/**
 * TableCell component provides a styled data cell for tables.
 * Applies consistent padding and border styling.
 */
export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ style = {}, ...props }) => (
  <td
    style={{
      padding: 4,
      verticalAlign: "middle",
      border: "1px solid white",
      ...style,
    }}
    {...props}
  />
);

/**
 * TableRow component props
 */
type TableRowProps = React.TableHTMLAttributes<HTMLTableRowElement> & {
  /** Apply alternating background color for better readability */
  zebraStriped?: boolean;
  /** Show delete button in the action panel */
  deletable?: boolean;
  /** Show edit button in the action panel */
  editable?: boolean;
  /** Callback function when delete button is clicked */
  onDelete?: () => void;
  /** Callback function when edit button is clicked */
  onEdit?: () => void;
};

/**
 * TableRow component provides a styled row for tables with optional actions.
 * Supports zebra striping for better readability and automatically adds
 * edit/delete buttons when enabled.
 *
 * ```
 * <TableRow
 *   zebraStriped={true}
 *   deletable={true}
 *   editable={true}
 *   onDelete={() => handleDelete(row.id)}
 *   onEdit={() => handleEdit(row.id)}
 * >
 *   <TableCell>{row.name}</TableCell>
 *   <TableCell>{row.email}</TableCell>
 * </TableRow>
 * ```
 */
export const TableRow: React.FC<TableRowProps> = ({
  zebraStriped = false,
  deletable = false,
  editable = false,
  onDelete,
  onEdit,
  style,
  children,
  className,
  ...props
}) => (
  <tr
    {...props}
    className={`${className || ""}`}
    style={{
      ...(style || {}),
      backgroundColor:
        (style && style.backgroundColor) ||
        (zebraStriped ? styleVariables.grey5 : ""),
    }}
  >
    {deletable === false && editable === false
      ? children
      : React.Children.toArray(children).map((child, index, array) => {
          // clone the last child and append the remove button
          if (index !== array.length - 1) {
            return child;
          }

          if (!React.isValidElement(child)) {
            return child;
          }

          const childElement = child as React.ReactElement<any>;

          return React.cloneElement(
            childElement,
            {},
            <TableRowAdditionalColumn>
              {childElement.props.children}
              <ActionsPanel>
                {editable && (
                  <ActionButton onClick={onEdit}>
                    <IconEdit fill={styleVariables.grey1} size={16} />
                  </ActionButton>
                )}
                {deletable && (
                  <ActionButton onClick={onDelete}>
                    <IconRemove fill={styleVariables.red} size={16} />
                  </ActionButton>
                )}
              </ActionsPanel>
            </TableRowAdditionalColumn>
          );
        })}
  </tr>
);

/**
 * Table component provides a styled table with consistent border collapse.
 * Use with TableHeaderCell, TableCell, and TableRow components for a complete table.
 *
 * ```
 * <Table width="100%">
 *   <thead>
 *     <tr>
 *       <TableHeaderCell>Name</TableHeaderCell>
 *       <TableHeaderCell>Email</TableHeaderCell>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     {data.map(row => (
 *       <TableRow
 *         key={row.id}
 *         zebraStriped={true}
 *         deletable={true}
 *         onDelete={() => handleDelete(row.id)}
 *       >
 *         <TableCell>{row.name}</TableCell>
 *         <TableCell>{row.email}</TableCell>
 *       </TableRow>
 *     ))}
 *   </tbody>
 * </Table>
 * ```
 */
export const Table: React.FC<TableProps> = ({
  innerRef,
  children,
  style,
  width,
  ...props
}) => {
  return (
    <table
      {...props}
      ref={innerRef}
      style={{
        ...(style || {}),
        width,
        borderCollapse: "collapse",
      }}
    >
      {children}
    </table>
  );
};

/**
 * Internal component for displaying table row content with action buttons
 */
const TableRowAdditionalColumn: React.FC<
  React.ThHTMLAttributes<HTMLDivElement>
> = ({ style, ...props }) => (
  <div
    style={{
      ...(style || {}),
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
    }}
    {...props}
  />
);

/**
 * Internal component for displaying action buttons panel
 */
const ActionsPanel: React.FC<React.ThHTMLAttributes<HTMLDivElement>> = ({
  style,
  ...props
}) => (
  <div
    style={{
      ...(style || {}),
      alignItems: "center",
      display: "flex",
      height: "32px",
      justifyContent: "center",
      left: "100%",
      maxHeight: "100%",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "64px",
    }}
    {...props}
  />
);

/**
 * Internal component for displaying action buttons
 */
const ActionButton: React.FC<React.ThHTMLAttributes<HTMLAnchorElement>> = ({
  style,
  ...props
}) => (
  // eslint-disable-next-line
  <a
    style={{
      ...(style || {}),
      cursor: "pointer",
      margin: "0 ($base / 2)",
    }}
    {...props}
  />
);
