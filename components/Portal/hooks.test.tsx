import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePortal, PortalBroker, PortalSource, PortalDestination } from './hooks';
import { renderHook } from '@testing-library/react-hooks';

describe('Portal Hooks', () => {
    describe('usePortal', () => {
        it('should create portal with send and receive functions', () => {
            const { result } = renderHook(() => usePortal());

            expect(result.current.send).toBeDefined();
            expect(result.current.receive).toBeDefined();
            expect(result.current.close).toBeDefined();
        });

        it('should capture final content when enabled', () => {
            const { result } = renderHook(() => usePortal(true));
            const content = <div>Test Content</div>;

            act(() => {
                result.current.send(content);
                result.current.close();
            });

            const receiverElement = render(result.current.receive());
            expect(receiverElement.container.textContent).toBe('Test Content');
        });
    });

    describe('Portal Components', () => {
        it('should render content from source to destination', () => {
            render(
                <PortalBroker>
                    <div>
                        <PortalDestination />
                        <PortalSource>
                            <div data-testid="portal-content">Teleported Content</div>
                        </PortalSource>
                    </div>
                </PortalBroker>,
            );

            const portalContent = screen.getByTestId('portal-content');
            expect(portalContent).toBeInTheDocument();
        });

        it('should throw error when PortalSource is used without PortalBroker', () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

            expect(() =>
                render(
                    <PortalSource>
                        <div>Content</div>
                    </PortalSource>,
                ),
            ).toThrow('PortalSource must be used within a PortalBroker');

            consoleError.mockRestore();
        });

        it('should throw error when PortalDestination is used without PortalBroker', () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

            expect(() => render(<PortalDestination />)).toThrow('PortalDestination must be used within a PortalBroker');

            consoleError.mockRestore();
        });

        it('should handle multiple portal pairs', () => {
            render(
                <PortalBroker>
                    <div>
                        <div>
                            <PortalDestination />
                            <PortalSource>
                                <div data-testid="content-1">First Content</div>
                            </PortalSource>
                        </div>
                        <PortalBroker>
                            <div>
                                <PortalDestination />
                                <PortalSource>
                                    <div data-testid="content-2">Second Content</div>
                                </PortalSource>
                            </div>
                        </PortalBroker>
                    </div>
                </PortalBroker>,
            );

            expect(screen.getByTestId('content-1')).toBeInTheDocument();
            expect(screen.getByTestId('content-2')).toBeInTheDocument();
        });

        it('should update portal content when source changes', () => {
            const { rerender } = render(
                <PortalBroker>
                    <div>
                        <PortalDestination />
                        <PortalSource>
                            <div data-testid="portal-content">Initial Content</div>
                        </PortalSource>
                    </div>
                </PortalBroker>,
            );

            expect(screen.getByText('Initial Content')).toBeInTheDocument();

            rerender(
                <PortalBroker>
                    <div>
                        <PortalDestination />
                        <PortalSource>
                            <div data-testid="portal-content">Updated Content</div>
                        </PortalSource>
                    </div>
                </PortalBroker>,
            );

            expect(screen.getByText('Updated Content')).toBeInTheDocument();
        });
    });
});
