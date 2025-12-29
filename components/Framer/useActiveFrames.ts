import { useRef, useState, useEffect, useCallback, useMemo, useLayoutEffect } from 'react';

import { FrameType } from './types';

export default function useCurrentFrames() {
    const [currentFrames, setCurrentFrames] = useState<(FrameType & { id: string })[]>([]);
    const [isActive, setIsActive] = useState(currentFrames.length > 0);

    const deactivating = useRef(false);

    const safeToDeactivate = useCallback(() => {
        if (deactivating.current) {
            deactivating.current = false;
            setCurrentFrames([]);
            setIsActive(false);
        }
    }, []);

    const [queuedDeleteId, setQueuedDeleteId] = useState<string>('');

    useEffect(() => {
        if (!queuedDeleteId) return;

        setCurrentFrames((prev) => prev.filter((frame) => frame.id !== queuedDeleteId));
        setQueuedDeleteId('');
    }, [queuedDeleteId]);

    const deleteFrame = useCallback(
        (id: string) => {
            if (!currentFrames.length) return;

            if (currentFrames.length > 1) {
                setQueuedDeleteId(id);
                return;
            }

            if (!deactivating.current) {
                deactivating.current = true;
                setIsActive(false);
            }
        },
        [currentFrames],
    );

    const createFrame = useCallback((id: string, frame: FrameType) => {
        setCurrentFrames((prev) => {
            const { priority } = frame;

            if (priority === undefined) {
                return [...prev, { id, ...frame }];
            }

            const before = prev.filter((f) => f.priority !== undefined && f.priority <= priority);
            const after = prev.filter((f) => f.priority === undefined || f.priority > priority);

            return [...before, { id, ...frame }, ...after];
        });

        setIsActive(true);
    }, []);

    const updateFrame = useCallback((id: string, frame: FrameType) => {
        setCurrentFrames((prev) => {
            const existingFrame = prev.find((f) => f.id === id);
            if (!existingFrame) return prev;

            const updatedFrame = { ...existingFrame, ...frame };

            const oldPriority = existingFrame.priority;
            const newPriority = updatedFrame.priority;

            // update "in place"
            if (oldPriority === newPriority) {
                const oldIndex = prev.findIndex((f) => f.id === id);
                const before = prev.slice(0, oldIndex);
                const after = prev.slice(oldIndex + 1);

                return [...before, updatedFrame, ...after];
            }

            // insert after the last frame with the same priority
            if (newPriority !== undefined) {
                const before = prev
                    .filter((f) => f.id !== updatedFrame.id)
                    .filter((f) => f.priority !== undefined && f.priority <= newPriority);
                const after = prev
                    .filter((f) => f.id !== updatedFrame.id)
                    .filter((f) => f.priority === undefined || f.priority > newPriority);

                return [...before, updatedFrame, ...after];
            }

            // insert at the beginning of the un-prioritized frames
            if (newPriority === undefined) {
                const before = prev.filter((f) => f.id !== updatedFrame.id).filter((f) => f.priority !== undefined);
                const after = prev.filter((f) => f.id !== updatedFrame.id).filter((f) => f.priority === undefined);

                return [...before, updatedFrame, ...after];
            }

            return prev;
        });
    }, []);

    const setFrame = useCallback(
        (id: string, frame?: FrameType | null) => {
            if (!frame) {
                deleteFrame(id);
                return;
            }

            if (currentFrames.find((f) => f.id === id)) {
                updateFrame(id, frame);
                return;
            }

            createFrame(id, frame);
        },
        [currentFrames, createFrame, updateFrame, deleteFrame],
    );

    // api needs to be render stable
    const setFrameRef = useRef(setFrame);
    useLayoutEffect(() => {
        setFrameRef.current = setFrame;
    }, [setFrame]);

    const api = useCallback((id: string, frame?: FrameType | null) => setFrameRef.current(id, frame), []);

    return useMemo(
        () => ({
            api,
            currentFrames,
            isActive,
            safeToDeactivate,
        }),
        [api, currentFrames, isActive, safeToDeactivate],
    );
}
