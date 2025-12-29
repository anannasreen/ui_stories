export type Styles = {
    control: string;
    controls: string;
    fullscreen: string;
    fullscreenButton: string;
    hidden: string;
    playButton: string;
    pointOfInterest: string;
    seekBar: string;
    seekIndicator: string;
    video: string;
    videoOverlayContainer: string;
    videoWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
