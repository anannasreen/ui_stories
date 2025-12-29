import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Portal } from '.';

describe('Portal', () => {
    beforeEach(() => {
        Portal.count = 0;
    });

    afterEach(() => {
        cleanup();
    });

    it('should render children in a portal div at root level', () => {
        const { baseElement } = render(
            <Portal>
                <div data-testid="portal-content">Portal Content</div>
            </Portal>,
        );

        const portalContent = screen.getByTestId('portal-content');
        expect(portalContent).toBeInTheDocument();
        expect(portalContent.parentElement?.getAttribute('data-name')).toBe('portal-1');
        expect(baseElement.contains(portalContent)).toBe(true);
    });

    it('should increment portal count for each instance', () => {
        render(
            <>
                <Portal>
                    <div data-testid="first-portal">First Portal</div>
                </Portal>
                <Portal>
                    <div data-testid="second-portal">Second Portal</div>
                </Portal>
            </>,
        );

        const firstPortal = screen.getByTestId('first-portal');
        const secondPortal = screen.getByTestId('second-portal');

        expect(firstPortal.parentElement?.getAttribute('data-name')).toBe('portal-1');
        expect(secondPortal.parentElement?.getAttribute('data-name')).toBe('portal-2');
        expect(Portal.count).toBe(2);
    });

    it('should use custom renderName function', () => {
        const renderName = (index: number) => `custom-portal-${index}`;
        render(
            <Portal renderName={renderName}>
                <div data-testid="custom-portal">Custom Named Portal</div>
            </Portal>,
        );

        const portalContent = screen.getByTestId('custom-portal');
        expect(portalContent.parentElement?.getAttribute('data-name')).toBe('custom-portal-1');
    });

    it('should apply default z-index of 10', () => {
        render(
            <Portal>
                <div data-testid="default-portal">Default Z-Index Portal</div>
            </Portal>,
        );

        const portalContent = screen.getByTestId('default-portal');
        expect(portalContent.parentElement).toHaveStyle({ zIndex: '10' });
    });

    it('should apply custom z-index', () => {
        render(
            <Portal zIndex={100}>
                <div data-testid="custom-z-portal">Custom Z-Index Portal</div>
            </Portal>,
        );

        const portalContent = screen.getByTestId('custom-z-portal');
        expect(portalContent.parentElement).toHaveStyle({ zIndex: '100' });
    });

    it('should remove portal from DOM on unmount', () => {
        const { unmount } = render(
            <Portal>
                <div data-testid="unmounting-portal">Unmounting Portal</div>
            </Portal>,
        );

        const portalContent = screen.getByTestId('unmounting-portal');
        const portalElement = portalContent.parentElement;
        expect(portalElement).toBeInTheDocument();

        unmount();

        expect(portalElement).not.toBeInTheDocument();
    });

    it('should maintain relative positioning', () => {
        render(
            <Portal>
                <div data-testid="positioned-portal">Positioned Portal</div>
            </Portal>,
        );

        const portalContent = screen.getByTestId('positioned-portal');
        expect(portalContent.parentElement).toHaveStyle({ position: 'relative' });
    });
});
