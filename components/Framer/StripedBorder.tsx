import React from 'react';

import Stripes, { Props as StripesProps } from './Stripes';
import Border, { Props as BorderProps } from './Border';

import styles from './StripedBorder.module.scss';

export interface Props extends Omit<BorderProps, 'borderContents'>, StripesProps {
    /** Width of individual stripes in pixels */
    stripeWidth?: number;
}

/**
 * StripedBorder component combines Border and Stripes components to create a container
 * with animated striped borders. The border colors, width, and angle can be customized.
 *
 * ```
 * <StripedBorder
 *   colors={['#ff0000', '#00ff00', '#0000ff']}
 *   stripeWidth={10}
 *   angle={45}
 *   visible={true}
 * >
 *   Content inside the striped border
 * </StripedBorder>
 * ```
 */
export default function StripedBorder({ colors, stripeWidth, angle, visible, children, ...etc }: Props) {
    return (
        <Border
            {...etc}
            visible={visible}
            borderContents={
                <Stripes
                    colors={colors}
                    width={stripeWidth}
                    angle={angle}
                    visible={visible}
                    className={styles.stripes}
                />
            }
        >
            {children}
        </Border>
    );
}
