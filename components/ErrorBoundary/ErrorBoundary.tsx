import React from 'react';
import clsx from 'clsx';
import { FaExclamationTriangle } from 'react-icons/fa';

import styles from './styles.module.scss';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    /** The error message to display. Can be a `ReactElement`, string, or a component that receives the caught error as a prop. */
    message?: React.ReactChild | React.FC<{ error: unknown }>;

    /** Manually show the error message. If the boundary catches an error, this prop will be ignored. */
    hasError?: boolean;

    /** Function to call when the component catches an error. Default is `console.error` */
    onError?: (error: unknown) => void;
}

interface State {
    /** Whether an error has been caught */
    caughtError: boolean;
    /** The last error that was caught */
    lastError: any;
}

/**
 * A component for displaying error messaging and trapping errors in the component tree
 */
export default class ErrorBoundary extends React.Component<Props, State> {
    static defaultProps = {
        message: (
            <span>
                <FaExclamationTriangle /> There was a problem
            </span>
        ),
        hasError: false,
    };

    state: State = {
        caughtError: false,
        lastError: null,
    };

    componentDidCatch(error: unknown) {
        const { onError } = this.props;

        this.setState({ caughtError: true, lastError: error });

        if (onError) {
            onError(error);
        } else {
            console.error(error);
        }
    }

    render() {
        const { children, message, hasError, className, ...etc } = this.props;
        const { caughtError, lastError } = this.state;

        if (hasError || caughtError) {
            return (
                <div className={clsx(styles.ErrorBoundary, className)} {...etc}>
                    {typeof message === 'function' ? React.createElement(message, { error: lastError }) : message}
                </div>
            );
        }

        return children;
    }
}
