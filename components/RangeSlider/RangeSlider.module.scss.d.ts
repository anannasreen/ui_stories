export type Styles = {
    Input: string;
    Label: string;
    Slider: string;
    SliderOutput: string;
    SliderThumb: string;
    SliderTrack: string;
    TickMark: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
