export type Styles = {
    'loader-rotate': string;
    paused: string;
    spinner: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
