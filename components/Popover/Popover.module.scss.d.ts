export type Styles = {
    content: string;
    dialog: string;
    header: string;
    popover: string;
    triggerContainer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
