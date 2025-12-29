import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ExternalLink from '.';
import styles from './ExternalLink.module.scss';

vi.mock('react-icons/fa', () => ({
    FaExternalLinkAlt: () => <div data-testid="external-link-icon" />,
}));

describe('ExternalLink', () => {
    it('renders children correctly', () => {
        render(<ExternalLink href="https://example.com">Click here</ExternalLink>);

        expect(screen.getByText('Click here')).toBeInTheDocument();
        expect(screen.getByTestId('external-link-icon')).toBeInTheDocument();
    });

    it('applies default target and rel attributes', () => {
        render(<ExternalLink href="https://example.com">Click here</ExternalLink>);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('allows overriding target and rel attributes', () => {
        render(
            <ExternalLink href="https://example.com" target="_self" rel="nofollow">
                Click here
            </ExternalLink>,
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_self');
        expect(link).toHaveAttribute('rel', 'nofollow');
    });

    it('applies href correctly', () => {
        const url = 'https://example.com';
        render(<ExternalLink href={url}>Click here</ExternalLink>);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', url);
    });

    it('applies custom className along with default styles', () => {
        const customClass = 'custom-class';
        render(
            <ExternalLink href="https://example.com" className={customClass}>
                Click here
            </ExternalLink>,
        );

        const link = screen.getByRole('link');
        expect(link).toHaveClass(styles.externalLink, customClass);
    });

    it('passes through additional HTML props', () => {
        render(
            <ExternalLink href="https://example.com" data-testid="test-link" aria-label="External link to example">
                Click here
            </ExternalLink>,
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('data-testid', 'test-link');
        expect(link).toHaveAttribute('aria-label', 'External link to example');
    });

    it('renders with correct structure', () => {
        render(<ExternalLink href="https://example.com">Click here</ExternalLink>);

        const link = screen.getByRole('link');
        const icon = screen.getByTestId('external-link-icon');
        const text = screen.getByText('Click here');

        expect(link).toContainElement(icon);
        expect(link).toContainElement(text);
        expect(text.tagName).toBe('SPAN');
    });
});
