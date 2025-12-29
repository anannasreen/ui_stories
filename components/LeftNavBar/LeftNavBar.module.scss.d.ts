export type Styles = {
    collapsed: string;
    content: string;
    expanded: string;
    footer: string;
    hamburger: string;
    header: string;
    label: string;
    leftNavBar: string;
    nav: string;
    navItem: string;
    title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
