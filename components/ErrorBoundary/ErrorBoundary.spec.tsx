import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from '.';
import { vi } from 'vitest';

const Harness = ({ shouldThrow = true, error }: { shouldThrow?: boolean; error?: any }) => {
    useEffect(() => {
        if (!shouldThrow) return;
        throw error === undefined ? new Error('awful') : error;
    }, [shouldThrow, error]);

    return <div>Hello</div>;
};

describe('<ErrorBoundary />', () => {
    describe('no errors', () => {
        it('renders its children', () => {
            const result = render(
                <ErrorBoundary>
                    <Harness shouldThrow={false} />
                </ErrorBoundary>,
            );
            expect(result.getByText('Hello')).toBeInTheDocument();
        });
    });

    describe('catching errors', () => {
        it('shows the default error message', () => {
            vi.spyOn(console, 'error').mockImplementation(() => {});

            const result = render(
                <ErrorBoundary>
                    <Harness />
                </ErrorBoundary>,
            );
            expect(result.getByText('There was a problem')).toBeInTheDocument();
        });

        it('can a display custom error message', () => {
            vi.spyOn(console, 'error').mockImplementation(() => {});

            const result = render(
                <ErrorBoundary message="Oops">
                    <Harness />
                </ErrorBoundary>,
            );
            expect(result.getByText('Oops')).toBeInTheDocument();
        });

        it('can render a custom error message from the error', () => {
            vi.spyOn(console, 'error').mockImplementation(() => {});

            const result = render(
                <ErrorBoundary
                    message={({ error }) => {
                        return <>An {error instanceof Error ? error.message : error || 'unknown'} error occurred</>;
                    }}
                >
                    <Harness />
                </ErrorBoundary>,
            );
            expect(result.getByText('An awful error occurred')).toBeInTheDocument();
        });

        it('calls the onError callback when it catches and error', () => {
            const onError = vi.fn();
            const error = new Error('the error');

            render(
                <ErrorBoundary onError={onError}>
                    <Harness error={error} />
                </ErrorBoundary>,
            );
            expect(onError).toHaveBeenCalledWith(error);
        });
    });

    describe('manually showing error messaging', () => {
        it('displays the error message', () => {
            const result = render(<ErrorBoundary hasError>Other stuff</ErrorBoundary>);
            expect(result.getByText('There was a problem')).toBeInTheDocument();
        });
    });
});
