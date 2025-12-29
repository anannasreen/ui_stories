import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Container } from '.';

describe('Container', () => {
    it('renders children correctly', () => {
        render(
            <Container>
                <div data-testid="test-child">Test Content</div>
            </Container>,
        );

        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(screen.getByTestId('test-child')).toHaveTextContent('Test Content');
    });

    it('passes through additional HTML props', () => {
        render(
            <Container data-testid="test-container" aria-label="test container">
                <div>Content</div>
            </Container>,
        );

        const container = screen.getByTestId('test-container');
        expect(container).toHaveAttribute('aria-label', 'test container');
    });
});
