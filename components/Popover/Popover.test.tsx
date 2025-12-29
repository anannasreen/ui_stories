import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Button from '../Button';
import Popover from '.';

describe('Popover', () => {
    const defaultProps = {
        content: <div data-testid="popover-content">Popover Content</div>,
        defaultOpen: true,
    };

    it('renders trigger element', () => {
        render(
            <Popover {...defaultProps} defaultOpen={false}>
                <Button data-testid="trigger-button">Open Popover</Button>
            </Popover>,
        );

        expect(screen.getByTestId('trigger-button')).toBeInTheDocument();
        expect(screen.getByText('Open Popover')).toBeInTheDocument();
    });

    it('renders content when defaultOpen is true', () => {
        render(
            <Popover {...defaultProps}>
                <Button>Open Popover</Button>
            </Popover>,
        );

        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
        expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });

    it('does not render content when defaultOpen is false', () => {
        render(
            <Popover {...defaultProps} defaultOpen={false}>
                <Button>Open Popover</Button>
            </Popover>,
        );

        expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });

    it('renders title when provided', () => {
        render(
            <Popover {...defaultProps} title="Test Popover Title">
                <Button>Open Popover</Button>
            </Popover>,
        );

        expect(screen.getByText('Test Popover Title')).toBeInTheDocument();
    });

    it('renders close button when title is provided', () => {
        render(
            <Popover {...defaultProps} title="Test Popover Title">
                <Button>Open Popover</Button>
            </Popover>,
        );

        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('applies custom width when provided', () => {
        render(
            <Popover {...defaultProps} width={300}>
                <Button>Open Popover</Button>
            </Popover>,
        );

        const dialog = screen.getByTestId('aria-dialog');
        expect(dialog).toHaveStyle({ width: '300px' });
    });

    it('applies custom placement when provided', () => {
        render(
            <Popover {...defaultProps} placement="top">
                <Button>Open Popover</Button>
            </Popover>,
        );

        const popover = screen.getByTestId('aria-popover');
        expect(popover).toHaveAttribute('data-placement', 'top');
    });

    it('applies custom offset when provided', () => {
        render(
            <Popover {...defaultProps} offset={16}>
                <Button>Open Popover</Button>
            </Popover>,
        );

        const popover = screen.getByTestId('aria-popover');
        expect(popover).toHaveAttribute('data-offset', '16');
    });

    it('applies custom className to popover', () => {
        render(
            <Popover {...defaultProps} className="custom-popover-class">
                <Button>Open Popover</Button>
            </Popover>,
        );

        const popover = screen.getByTestId('aria-popover');
        expect(popover).toHaveClass('custom-popover-class');
    });

    it('applies custom contentClassName to dialog', () => {
        render(
            <Popover {...defaultProps} contentClassName="custom-content-class">
                <Button>Open Popover</Button>
            </Popover>,
        );

        const dialog = screen.getByTestId('aria-dialog');
        expect(dialog).toHaveClass('custom-content-class');
    });
});
