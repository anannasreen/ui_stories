export type Styles = {
    container: string;
    content: string;
    dark: string;
    light: string;
    muted: string;
    wrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
