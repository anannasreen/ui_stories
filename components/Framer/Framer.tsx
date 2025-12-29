import React from 'react';
import clsx from 'clsx';

import StripedBorder from './StripedBorder';
import Tags from './Tags';
import Tag from './Tag';
import useActiveFrames from './useActiveFrames';
import ApiContext from './context';

import styles from './Framer.module.scss';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    /** Width of the stripes in the border in pixels */
    stripeWidth?: number;
}

/**
 * Framer component creates a container with striped borders that can display floating tags.
 * It serves as the context provider for Frame components and manages the display of active frames.
 *
 * ```
 * <Framer stripeWidth={15}>
 *   <Frame color="#ff0000">Tag Content</Frame>
 *   <div>Main content goes here</div>
 * </Framer>
 * ```
 */
export default function Framer({ stripeWidth = 20, className, children, ...etc }: Props) {
    const { api, isActive, currentFrames, safeToDeactivate } = useActiveFrames();

    return (
        <ApiContext.Provider value={api}>
            <StripedBorder
                visible={isActive}
                thickness={4}
                stripeWidth={stripeWidth}
                colors={currentFrames.map((f) => f.color)}
                className={clsx(styles.Framer, className)}
                {...etc}
            >
                <Tags onTransitionEnd={safeToDeactivate}>
                    {currentFrames.map((frame, i, items) => (
                        <Tag color={frame.color} width={frame.width} key={frame.id} onlyChild={items.length === 1}>
                            {frame.renderTag()}
                        </Tag>
                    ))}
                </Tags>
                <div className={clsx(styles.content)}>{children}</div>
            </StripedBorder>
        </ApiContext.Provider>
    );
}
