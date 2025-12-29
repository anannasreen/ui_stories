export type Styles = {
    avatar: string;
    initialsContainer: string;
    sizeLG: string;
    sizeMD: string;
    sizeSM: string;
    sizeXL: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
