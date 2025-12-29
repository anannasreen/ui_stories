export type Styles = {
    closeButton: string;
    closeIcon: string;
    destructive: string;
    disabled: string;
    list: string;
    pill: string;
    pillText: string;
    small: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
