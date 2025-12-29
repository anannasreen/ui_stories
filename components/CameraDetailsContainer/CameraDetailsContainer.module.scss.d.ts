export type Styles = {
    cameraInfo: string;
    container: string;
    fullScreenButton: string;
    offline: string;
    online: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
