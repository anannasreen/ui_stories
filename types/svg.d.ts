/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}
