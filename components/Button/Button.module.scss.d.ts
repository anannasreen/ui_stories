export type Styles = {
    button: string;
    default: string;
    destructive: string;
    fullscreen: string;
    ghost: string;
    icon: string;
    medium: string;
    outline: string;
    primary: string;
    secondary: string;
    small: string;
    success: string;
    xs: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
