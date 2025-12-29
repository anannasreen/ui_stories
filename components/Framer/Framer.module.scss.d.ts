export type Styles = {
    content: string;
    Framer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
