export type Styles = {
    root: string;
    rootMuted: string;
    volumeButton: string;
    volumeIcon: string;
    volumeSlider: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
