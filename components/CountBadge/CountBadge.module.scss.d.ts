export type Styles = {
    count: string;
    CountBadge: string;
    selected: string;
    wrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
