import React, { useRef, useState, forwardRef, useCallback, useEffect, useLayoutEffect, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { getScrollOffset, setScrollOffset } from '../utils';
import { Orientation } from '../types';

import styles from './styles.module.scss';

export type RefType = HTMLDivElement;

export interface Props extends HTMLAttributes<HTMLDivElement> {
    scrollSize: number;
    scrollOffset?: number;
    contentOffset?: number;
    orientation?: Orientation;
    reversed?: boolean;
    fitToContent?: boolean;
    onScroll?: (offset: any) => void;
    activeTimeoutMs?: number;
}

/**
 * Container with controlled scroll offset and content position.
 */
export default forwardRef<RefType, Props>(function ScrollingContainer(
    {
        scrollSize,
        scrollOffset = 0,
        contentOffset = 0,
        orientation = Orientation.Vertical,
        reversed = false,
        fitToContent = false,
        onScroll: externalOnScroll,
        activeTimeoutMs = 2000,
        children,
        className,
        onMouseEnter: externalOnMouseEnter,
        onMouseLeave: externalOnMouseLeave,
        style,
        ...etc
    },
    forwardedRef,
) {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(style?.width || '100%');
    const [height, setHeight] = useState(style?.height || '100%');
    const [isActive, setIsActive] = useState(false);

    // auto-adjust height/width to fit content
    useEffect(() => {
        if (!fitToContent || !viewportRef.current || !contentRef.current) return;

        if (orientation === 'horizontal' && !style?.height) {
            const height = Math.max(viewportRef.current.offsetHeight, contentRef.current.offsetHeight);
            setHeight(`${height}px`);
            return;
        }

        if (orientation === 'vertical' && !style?.width) {
            const width = Math.max(viewportRef.current.offsetWidth, contentRef.current.offsetWidth);
            setWidth(`${width}px`);
        }
    }, [fitToContent, orientation, style]);

    const getViewportOffset = useCallback(() => {
        const $viewport = viewportRef.current;
        return getScrollOffset($viewport, { orientation, reversed });
    }, [orientation, reversed]);

    const setViewportOffset = useCallback(
        (offset: number) => {
            const $viewport = viewportRef.current;
            return setScrollOffset($viewport, offset, { orientation, reversed });
        },
        [orientation, reversed],
    );

    const scrollOffsetRef = useRef(scrollOffset);
    useLayoutEffect(() => {
        scrollOffsetRef.current = scrollOffset;
        setViewportOffset(scrollOffset);
    }, [scrollOffset, setViewportOffset]);

    // While the user is interacting with the component,
    // override the browser's scrolling inertia.
    useLayoutEffect(() => {
        if (!isActive) return;

        let frame: number;
        let lastScrollOffsetUpdateRequest: number | undefined;

        const step = () => {
            const viewportOffset = getViewportOffset();
            const scrollOffset = scrollOffsetRef.current;

            if (viewportOffset !== scrollOffset) {
                // fake prevent default, since we aren't allowed to directly
                // on scroll events
                setViewportOffset(scrollOffset);

                if (scrollOffset === lastScrollOffsetUpdateRequest) {
                    lastScrollOffsetUpdateRequest = undefined;
                } else {
                    if (externalOnScroll) {
                        externalOnScroll(viewportOffset);
                        lastScrollOffsetUpdateRequest = viewportOffset;
                    }
                }
            }

            frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => {
            cancelAnimationFrame(frame);
        };
    }, [externalOnScroll, getViewportOffset, setViewportOffset, isActive]);

    // keep the inertia stopper animation running for awhile after the user has
    // stopped interacting with the component (to capture any ongoing e.g. wheel
    // events).
    const activationTimeout = useRef<ReturnType<typeof setTimeout> | null>();
    const activate = useCallback(() => {
        if (activationTimeout.current) {
            clearTimeout(activationTimeout.current);
            activationTimeout.current = null;
        }
        setIsActive(true);
    }, []);

    const deactivate = useCallback(() => {
        activationTimeout.current = setTimeout(() => setIsActive(false), activeTimeoutMs);
    }, [activeTimeoutMs]);

    const onMouseEnter = useCallback(
        (e) => {
            activate();
            if (externalOnMouseEnter) {
                externalOnMouseEnter(e);
            }
        },
        [activate, externalOnMouseEnter],
    );

    const onMouseLeave = useCallback(
        (e) => {
            deactivate();
            if (externalOnMouseLeave) {
                externalOnMouseLeave(e);
            }
        },
        [deactivate, externalOnMouseLeave],
    );

    return (
        <div
            style={
                {
                    ...style,
                    '--scroll-size': `${scrollSize}px`,
                    '--scroll-offset': `${scrollOffset}px`,
                    '--content-offset': `${contentOffset}px`,
                    height,
                    width,
                } as React.CSSProperties
            }
            className={clsx(styles.ScrollingContainer, {
                [styles.horizontal]: orientation === 'horizontal',
                [styles.vertical]: orientation === 'vertical',
                [styles.reversed]: reversed,
            })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-testid="scrolling-container"
            ref={forwardedRef}
            {...etc}
        >
            <div className={styles.viewport} ref={viewportRef} data-testid="scrolling-container-viewport">
                <div className={styles.contentWrap}>
                    <div className={styles.content} ref={contentRef} data-testid="scrolling-container-content">
                        {children}
                    </div>
                </div>
                <div className={styles.scroll} data-testid="scrolling-container-scroll" />
            </div>
        </div>
    );
});
