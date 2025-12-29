export type Styles = {
    buttons: string;
    errorMessage: string;
    message: string;
    title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
