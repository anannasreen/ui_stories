export type Styles = {
    bodyLgBold: string;
    bodyLgMed: string;
    bodyLgRegular: string;
    bodyMdBold: string;
    bodyMdMed: string;
    bodyMdRegular: string;
    bodySmBold: string;
    bodySmMdUpperCase: string;
    bodySmMed: string;
    bodySmRegular: string;
    bodyXlBold: string;
    bodyXlMed: string;
    bodyXlRegular: string;
    bodyXsRegular: string;
    bodyXxlBold: string;
    bodyXxlMed: string;
    bodyXxlRegular: string;
    headingDisplay: string;
    headingH1: string;
    headingH2: string;
    headingH3: string;
    headingH4: string;
    headingH5: string;
    headingH6: string;
    headingTitle: string;
    text: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
