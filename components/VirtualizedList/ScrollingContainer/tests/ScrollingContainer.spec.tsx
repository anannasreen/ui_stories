import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ScrollingContainer from '..';
import { Orientation } from '../../types';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// TODO: use e2e testing to make sure the css variables get propagated through to the
// actual DOM nodes

const cssVariableValue = (el: Element | ChildNode | null, variableName: string) => {
    if (!el) return '';
    return getComputedStyle(el as Element).getPropertyValue(variableName);
};

describe('component css variables', () => {
    it('scroll size', () => {
        const result = render(
            <ScrollingContainer scrollSize={500}>
                <div>stuff</div>
            </ScrollingContainer>,
        );

        const ref = result.getByTestId('scrolling-container');
        expect(cssVariableValue(ref, '--scroll-size')).toEqual('500px');
    });

    it('scroll offset', () => {
        const result = render(
            <ScrollingContainer scrollSize={500} scrollOffset={10}>
                <div>stuff</div>
            </ScrollingContainer>,
        );

        const ref = result.getByTestId('scrolling-container');
        expect(cssVariableValue(ref, '--scroll-offset')).toEqual('10px');
    });

    it('content offset', () => {
        const result = render(
            <ScrollingContainer scrollSize={500} contentOffset={-10}>
                <div>stuff</div>
            </ScrollingContainer>,
        );

        const ref = result.getByTestId('scrolling-container');
        expect(cssVariableValue(ref, '--content-offset')).toEqual('-10px');
    });

    it('triggers onMouseEnter and onMouseLeave events', () => {
        const onMouseEnter = vi.fn();
        const onMouseLeave = vi.fn();

        const result = render(
            <ScrollingContainer
                scrollSize={100}
                scrollOffset={0}
                contentOffset={0}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                orientation={Orientation.Vertical}
            >
                <div>stuff</div>
            </ScrollingContainer>,
        );

        const container = result.getByTestId('scrolling-container');

        userEvent.hover(container);
        expect(onMouseEnter).toHaveBeenCalled();

        userEvent.unhover(container);
        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('adjusts size to fit content when fitToContent is true', async () => {
        const { rerender } = render(
            <ScrollingContainer
                scrollSize={100}
                scrollOffset={0}
                contentOffset={0}
                orientation={Orientation.Vertical}
                fitToContent={true}
                style={{ height: '100%' }}
            >
                <div>Stuff</div>
            </ScrollingContainer>,
        );

        await waitFor(() => {
            expect(screen.getByTestId('scrolling-container')).toHaveStyle({ height: '100%' });
        });

        rerender(
            <ScrollingContainer
                scrollSize={100}
                scrollOffset={0}
                contentOffset={0}
                orientation={Orientation.Vertical}
                fitToContent={true}
                style={{ height: '100%' }}
            >
                <div>Stuff</div>
            </ScrollingContainer>,
        );

        await waitFor(() => {
            expect(screen.getByTestId('scrolling-container')).toHaveStyle({ height: '100%' });
        });
    });
});
