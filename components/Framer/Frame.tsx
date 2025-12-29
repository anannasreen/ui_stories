import React, { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';

import { usePortal } from '../Portal/hooks';

import framedApiContext from './context';
import { FrameType } from './types';
import styles from './Frame.module.scss';

export interface Props {
    /** Content to be rendered inside the frame */
    children: React.ReactNode;
    /** Color of the frame */
    color: string;
    /** Optional priority level of the frame (higher numbers appear on top) */
    priority?: number;
    /** Width of the frame in pixels */
    width?: number;
}

/**
 * Custom hook for creating and managing frames.
 * Provides methods to create, destroy, and render content within a frame.
 */
const useFrame = (id?: string) => {
    const setFrame = useContext(framedApiContext);

    if (!setFrame) {
        throw new Error('useFrame must be used within Framed');
    }

    const [frameId] = useState(id || nanoid());
    const { send, receive, close } = usePortal(true);

    const create = useCallback(
        (frame: Omit<FrameType, 'renderTag'>) => {
            setFrame(frameId, { ...frame, renderTag: receive });
        },
        [setFrame, frameId, receive],
    );

    const destroy = useCallback(() => {
        close();
        setFrame(frameId, undefined);
    }, [setFrame, frameId, close]);

    const render = useCallback((content: React.ReactNode) => send(content), [send]);

    return useMemo(() => ({ render, create, destroy }), [render, create, destroy]);
};

/**
 * Frame component renders content within a customizable frame.
 * The frame is positioned and managed by the Framed context.
 *
 * ```
 * <Frame color="#ff0000" priority={2} width={150}>
 *   <div>Content to display in frame</div>
 * </Frame>
 * ```
 */
export default function Frame({ children: content, color, priority, width = 120 }: Props) {
    const { render, create, destroy } = useFrame();

    useEffect(() => () => destroy(), [destroy]);
    useEffect(() => create({ color, priority, width }), [color, priority, width, create]);

    return render(<div className={styles.frameContent}>{content}</div>);
}
