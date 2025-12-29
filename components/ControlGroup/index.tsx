import React, { HTMLProps, ReactNode } from 'react';
import clsx from 'clsx';
import css from './ControlGroup.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

/**
 * A container component for grouping form controls together.
 *
 * ControlGroup is a simple component that wraps its children in a `div` with
 * a class of `container`, which is used to style the container.
 */
export default function ControlGroup({ children, className, ...etc }: Props) {
    return (
        <div className={clsx(css.container, className)} {...etc}>
            {children}
        </div>
    );
}
