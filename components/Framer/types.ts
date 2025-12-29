import { ReactNode } from 'react';

export interface FrameType {
    renderTag: () => ReactNode | null;
    finalContent?: ReactNode;
    color: string;
    width: number;
    priority?: number;
}
