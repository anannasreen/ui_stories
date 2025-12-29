export type Styles = {
    actionGroup: string;
    vertical: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
