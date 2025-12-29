import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MdStar } from 'react-icons/md';
import CountBadge from '.';
import styles from './CountBadge.module.scss';

describe('CountBadge', () => {
    it('renders count correctly', () => {
        render(<CountBadge count={5} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders with icon when provided', () => {
        render(<CountBadge count={5} icon={<MdStar data-testid="star-icon" />} />);
        expect(screen.getByTestId('star-icon')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('applies base class and custom className', () => {
        const customClass = 'custom-class';
        render(<CountBadge count={5} className={customClass} />);

        const badge = screen.getByTestId('count-badge');
        expect(badge).toHaveClass(styles.CountBadge, customClass);
    });

    it('hides badge when count is 0', () => {
        render(<CountBadge count={0} />);

        const pulseElement = screen.queryByTestId('count-badge');
        expect(pulseElement).not.toBeInTheDocument();
    });

    it('hides badge when count is undefined', () => {
        render(<CountBadge />);

        const pulseElement = screen.queryByTestId('count-badge');
        expect(pulseElement).not.toBeInTheDocument();
    });

    it('passes through additional HTML props', () => {
        render(<CountBadge count={5} data-testid="test-badge" aria-label="notification count" />);

        const badge = screen.getByTestId('test-badge');
        expect(badge).toHaveAttribute('aria-label', 'notification count');
    });

    it('renders with correct structure', () => {
        render(<CountBadge count={5} icon={<MdStar data-testid="star-icon" />} data-testid="test-badge" />);

        const count = screen.getByText('5');
        const icon = screen.getByTestId('star-icon');

        expect(count.parentElement).toHaveClass(styles.wrapper);
        expect(count).toHaveClass(styles.count);
    });

    it('does not render icon when not provided', () => {
        render(<CountBadge count={5} data-testid="test-badge" />);
        expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    });
});
