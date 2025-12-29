export type Styles = {
    additionalInfo: string;
    button: string;
    content: string;
    criticalPriority: string;
    details: string;
    eventCard: string;
    footer: string;
    header: string;
    highPriority: string;
    large: string;
    small: string;
    thumbnail: string;
    time: string;
    titleRow: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
