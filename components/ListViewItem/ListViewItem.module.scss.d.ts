export type Styles = {
    content: string;
    gridStatus: string;
    gridTimestamp: string;
    image: string;
    imageContainer: string;
    listViewItem: string;
    mainContent: string;
    priority_critical: string;
    priority_high: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
