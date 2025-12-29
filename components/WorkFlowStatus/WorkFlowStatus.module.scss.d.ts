export type Styles = {
    description: string;
    iconWrapper: string;
    status: string;
    textWrapper: string;
    workflowContainer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
