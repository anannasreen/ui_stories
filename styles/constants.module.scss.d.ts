export type Styles = {
    base: string;
    bg1: string;
    bg2: string;
    bg3: string;
    bg4: string;
    brightGreen: string;
    brightStone: string;
    darkBlue: string;
    dustyPlum: string;
    fontFamily: string;
    green: string;
    greenHighlight: string;
    greenShadow: string;
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    lightBlue: string;
    lightningBlue: string;
    orange: string;
    plum: string;
    red: string;
    redHighlight: string;
    redShadow: string;
    rounded: string;
    skyBlue: string;
    teal: string;
    teleop: string;
    videoChat: string;
    videoChatHighlight: string;
    warmPink: string;
    warmStone: string;
    yellow: string;
    yellowHighlight: string;
    yellowShadow: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
