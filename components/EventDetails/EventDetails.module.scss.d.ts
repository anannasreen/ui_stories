export type Styles = {
    description: string;
    section: string;
    title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
