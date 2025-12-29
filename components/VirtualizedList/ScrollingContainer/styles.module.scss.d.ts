export type Styles = {
    content: string;
    contentWrap: string;
    horizontal: string;
    reversed: string;
    scroll: string;
    ScrollingContainer: string;
    vertical: string;
    viewport: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
