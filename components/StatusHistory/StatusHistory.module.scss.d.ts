export type Styles = {
    cell: string;
    headerCell: string;
    statusTable: string;
    statusWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
