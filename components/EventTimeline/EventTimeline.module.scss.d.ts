export type Styles = {
    arrow: string;
    critical: string;
    description: string;
    eventItem: string;
    events: string;
    eventTitle: string;
    eventTitleContainer: string;
    high: string;
    icon: string;
    iconContainer: string;
    imagePopup: string;
    line: string;
    timeline: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
