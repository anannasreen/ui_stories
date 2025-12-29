export type Styles = {
    container: string;
    disabled: string;
    selected: string;
    tab: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
