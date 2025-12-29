import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ControlGroup from '.';

describe('ControlGroup', () => {
    it('renders children correctly', () => {
        render(
            <ControlGroup>
                <button data-testid="button-1">Button 1</button>
                <button data-testid="button-2">Button 2</button>
            </ControlGroup>,
        );

        expect(screen.getByTestId('button-1')).toBeInTheDocument();
        expect(screen.getByTestId('button-2')).toBeInTheDocument();
    });

    it('merges provided className with container class', () => {
        const customClass = 'custom-class';
        render(
            <ControlGroup className={customClass}>
                <button>Button</button>
            </ControlGroup>,
        );

        const container = screen.getByText('Button').parentElement;
        expect(container).toHaveClass(customClass);
    });

    it('passes through additional HTML props', () => {
        render(
            <ControlGroup data-testid="test-group" aria-label="control group">
                <button>Button</button>
            </ControlGroup>,
        );

        const container = screen.getByTestId('test-group');
        expect(container).toHaveAttribute('aria-label', 'control group');
    });
});
