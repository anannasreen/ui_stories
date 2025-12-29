export type Styles = {
    active: string;
    defaultStyle: string;
    disabled: string;
    filterButton: string;
    icon: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
