export type Styles = {
    button: string;
    overlayArrow: string;
    toolTip: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
