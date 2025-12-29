export type Styles = {
    divider: string;
    horizontal: string;
    vertical: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
