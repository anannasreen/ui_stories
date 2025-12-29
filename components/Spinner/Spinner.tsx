import React from 'react';
import { FaSpinner as IconLoading } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import clsx from 'clsx';
import css from './Spinner.module.scss';

/**
 * Spinner component displays a loading animation.
 *
 * ```
 * <Spinner />
 * ```
 */
export const Spinner = ({ className, ...etc }: IconBaseProps) => (
    <IconLoading className={clsx(className, css.spinner)} {...etc} />
);
