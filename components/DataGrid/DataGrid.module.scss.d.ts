export type Styles = {
    activeSort: string;
    empty: string;
    enableSort: string;
    headerButton: string;
    interactive: string;
    loading: string;
    table: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
