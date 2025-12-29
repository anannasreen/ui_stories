export type Styles = {
    error: string;
    input: string;
    inputContainer: string;
    prefixIcon: string;
    suffix: string;
    withPrefixIcon: string;
    wrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
