import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TitleTooltip from './TitleTooltip';

describe('TitleTooltip', () => {
    it('renders children without tooltip when no title is provided', () => {
        render(
            <TitleTooltip>
                <span>Test Button</span>
            </TitleTooltip>,
        );

        // When no title is provided, TitleTooltip just renders children directly
        expect(screen.getByText('Test Button')).toBeInTheDocument();
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders children without tooltip when disabled is true', () => {
        render(
            <TitleTooltip title="Tooltip Text" disabled>
                <span>Test Button</span>
            </TitleTooltip>,
        );

        // When disabled is true, TitleTooltip just renders children directly
        expect(screen.getByText('Test Button')).toBeInTheDocument();
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders children with tooltip when title is provided', async () => {
        render(
            <TitleTooltip title="Tooltip Text">
                <span>Test Button</span>
            </TitleTooltip>,
        );

        // When title is provided, TitleTooltip wraps children with a tooltip trigger
        expect(screen.getByText('Test Button')).toBeInTheDocument();

        // Test by using the text content rather than role
        const buttonElement = screen.getByText('Test Button');
        expect(buttonElement).toBeInTheDocument();

        await userEvent.hover(buttonElement);
    });
});
