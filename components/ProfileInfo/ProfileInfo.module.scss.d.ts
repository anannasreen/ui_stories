export type Styles = {
    container: string;
    email: string;
    info: string;
    name: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
