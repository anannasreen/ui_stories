export type Styles = {
    Stripes: string;
    visible: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
