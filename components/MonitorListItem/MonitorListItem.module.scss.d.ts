export type Styles = {
    camera: string;
    content: string;
    contentContainer: string;
    critical: string;
    high: string;
    imageContainer: string;
    location: string;
    monitorListItem: string;
    selected: string;
    timestamp: string;
    unRead: string;
    updatedTime: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
