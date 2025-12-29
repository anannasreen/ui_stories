export type Styles = {
    eventContainer: string;
    inProgress: string;
    onHold: string;
    open: string;
    resolved: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
