import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HotkeyRoot, HotkeyGroup } from './Hotkeys';

vi.mock('react-hotkeys', () => ({
    GlobalHotKeys: ({ children, handlers = {}, keyMap = {}, ...props }: any) => (
        <div
            data-testid="global-hotkeys"
            data-handlers={Object.keys(handlers)}
            data-keymap={Object.keys(keyMap)}
            {...props}
        >
            {children}
        </div>
    ),
    HotKeys: ({ children, handlers = {}, keyMap = {}, ...props }: any) => (
        <div
            data-testid="local-hotkeys"
            data-handlers={Object.keys(handlers)}
            data-keymap={Object.keys(keyMap)}
            {...props}
        >
            {children}
        </div>
    ),
    configure: vi.fn(),
}));

describe('HotkeyRoot', () => {
    it('renders children within GlobalHotKeys', () => {
        render(
            <HotkeyRoot>
                <div data-testid="test-content">Test Content</div>
            </HotkeyRoot>,
        );

        const globalHotkeys = screen.getByTestId('global-hotkeys');
        expect(globalHotkeys).toBeInTheDocument();
        expect(within(globalHotkeys).getByTestId('test-content')).toBeInTheDocument();
    });
});

describe('HotkeyGroup', () => {
    const mockHandler = vi.fn();
    const testHotkeys = {
        TEST_ACTION: {
            name: 'Test Action',
            sequence: 'ctrl+t',
            handler: mockHandler,
        },
        ANOTHER_ACTION: {
            name: 'Another Action',
            sequence: ['cmd+a', 'ctrl+a'],
            handler: mockHandler,
        },
    };

    beforeEach(() => {
        mockHandler.mockClear();
    });

    it('renders with global hotkeys by default', () => {
        render(
            <HotkeyGroup groupName="Test Group" hotkeys={testHotkeys}>
                <div data-testid="test-content">Test Content</div>
            </HotkeyGroup>,
        );

        expect(screen.getByTestId('global-hotkeys')).toBeInTheDocument();
        expect(screen.queryByTestId('local-hotkeys')).not.toBeInTheDocument();
    });

    it('renders with local hotkeys when local prop is true', () => {
        render(
            <HotkeyGroup groupName="Test Group" hotkeys={testHotkeys} local>
                <div data-testid="test-content">Test Content</div>
            </HotkeyGroup>,
        );

        expect(screen.getByTestId('local-hotkeys')).toBeInTheDocument();
        expect(screen.queryByTestId('global-hotkeys')).not.toBeInTheDocument();
    });

    it('registers all hotkey handlers', () => {
        render(<HotkeyGroup groupName="Test Group" hotkeys={testHotkeys} />);

        const hotkeyComponent = screen.getByTestId('global-hotkeys');
        const registeredHandlers = hotkeyComponent.getAttribute('data-handlers')?.split(',');

        expect(registeredHandlers).toContain('TEST_ACTION');
        expect(registeredHandlers).toContain('ANOTHER_ACTION');
    });

    it('registers hotkeys with correct sequences', () => {
        render(<HotkeyGroup groupName="Test Group" hotkeys={testHotkeys} />);

        const hotkeyComponent = screen.getByTestId('global-hotkeys');
        const registeredKeys = hotkeyComponent.getAttribute('data-keymap')?.split(',');

        expect(registeredKeys).toContain('TEST_ACTION');
        expect(registeredKeys).toContain('ANOTHER_ACTION');
    });

    it('passes through additional props', () => {
        render(
            <HotkeyGroup groupName="Test Group" hotkeys={testHotkeys} className="test-class" style={{ color: 'red' }}>
                <div data-testid="test-content">Test Content</div>
            </HotkeyGroup>,
        );

        const hotkeyComponent = screen.getByTestId('global-hotkeys');
        expect(hotkeyComponent).toHaveClass('test-class');
    });

    it('renders children correctly', () => {
        render(
            <HotkeyGroup groupName="Test Group" hotkeys={testHotkeys}>
                <div data-testid="test-content">Test Content</div>
            </HotkeyGroup>,
        );

        const hotkeyComponent = screen.getByTestId('global-hotkeys');
        expect(within(hotkeyComponent).getByTestId('test-content')).toBeInTheDocument();
    });

    it('handles array of sequences', () => {
        const multiSequenceHotkeys = {
            TEST_ACTION: {
                name: 'Test Action',
                sequence: ['ctrl+a', 'cmd+a', 'alt+a'],
                handler: mockHandler,
            },
        };

        render(<HotkeyGroup groupName="Test Group" hotkeys={multiSequenceHotkeys} />);

        const hotkeyComponent = screen.getByTestId('global-hotkeys');
        expect(hotkeyComponent.getAttribute('data-keymap')).toContain('TEST_ACTION');
    });

    it('handles single sequence as string', () => {
        const singleSequenceHotkeys = {
            TEST_ACTION: {
                name: 'Test Action',
                sequence: 'ctrl+t',
                handler: mockHandler,
            },
        };

        render(<HotkeyGroup groupName="Test Group" hotkeys={singleSequenceHotkeys} />);

        const hotkeyComponent = screen.getByTestId('global-hotkeys');
        expect(hotkeyComponent.getAttribute('data-keymap')).toContain('TEST_ACTION');
    });
});
