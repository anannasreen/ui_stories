export type Styles = {
    disabled: string;
    error: string;
    formGroup: string;
    hasError: string;
    helpText: string;
    label: string;
    labelRow: string;
    suffix: string;
    suffixIcon: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
