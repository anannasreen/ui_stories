export type Styles = {
    body: string;
    container: string;
    content: string;
    critical: string;
    high: string;
    iconWrapper: string;
    muted: string;
    normal: string;
    title: string;
    wrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
