import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { GroupNameProvider, useGroupName } from './groupName';

const TestConsumer = () => {
    const groupName = useGroupName();
    return <div data-testid="test-consumer">{groupName}</div>;
};

describe('GroupNameProvider and useGroupName', () => {
    it('provides group name to children components', () => {
        render(
            <GroupNameProvider name="test-group">
                <TestConsumer />
            </GroupNameProvider>,
        );

        expect(screen.getByTestId('test-consumer')).toHaveTextContent('test-group');
    });

    it('returns undefined when used outside of GroupNameProvider', () => {
        render(<TestConsumer />);
        expect(screen.getByTestId('test-consumer')).toHaveTextContent('');
    });

    it('updates context value when name prop changes', () => {
        const { rerender } = render(
            <GroupNameProvider name="initial-group">
                <TestConsumer />
            </GroupNameProvider>,
        );

        expect(screen.getByTestId('test-consumer')).toHaveTextContent('initial-group');

        rerender(
            <GroupNameProvider name="updated-group">
                <TestConsumer />
            </GroupNameProvider>,
        );

        expect(screen.getByTestId('test-consumer')).toHaveTextContent('updated-group');
    });

    it('provides context to nested children', () => {
        render(
            <GroupNameProvider name="parent-group">
                <div>
                    <div>
                        <TestConsumer />
                    </div>
                </div>
            </GroupNameProvider>,
        );

        expect(screen.getByTestId('test-consumer')).toHaveTextContent('parent-group');
    });
});
