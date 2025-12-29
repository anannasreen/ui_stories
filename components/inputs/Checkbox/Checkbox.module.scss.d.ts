export type Styles = {
    checkbox: string;
    destructive: string;
    label: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
