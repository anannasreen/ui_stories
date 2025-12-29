import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getApplicationKeyMap } from 'react-hotkeys';
import { HotkeyOverlay } from '.';
import userEvent from '@testing-library/user-event';

vi.mock('./HotkeyOverlay.module.scss', () => ({
    default: {
        root: 'root-class',
        container: 'container-class',
        hotkey: 'hotkey-class',
    },
}));

vi.mock('react-hotkeys', () => ({
    getApplicationKeyMap: vi.fn(),
}));

vi.mock('../Hotkeys', () => ({
    HotkeyGroup: ({ hotkeys }: any) => {
        return (
            <div data-testid="hotkey-group">
                <button onClick={() => hotkeys.TOGGLE_HOTKEYS_OVERLAY.handler()}>Toggle Overlay</button>
            </div>
        );
    },
}));

describe('HotkeyOverlay', () => {
    const mockHotkeys = {
        TEST_HOTKEY_1: {
            name: 'Test Hotkey 1',
            sequences: [{ sequence: 'ctrl+1' }],
            group: 'Test Group',
        },
        TEST_HOTKEY_2: {
            name: 'Test Hotkey 2',
            sequences: [{ sequence: 'ctrl+2' }],
            group: 'Test Group',
        },
        GLOBAL_HOTKEY: {
            name: 'Global Hotkey',
            sequences: [{ sequence: 'ctrl+g' }],
            group: 'Global',
        },
    };

    beforeEach(() => {
        (getApplicationKeyMap as jest.Mock).mockReturnValue(mockHotkeys);
    });

    it('renders HotkeyGroup with toggle hotkey', () => {
        render(<HotkeyOverlay />);
        expect(screen.getByTestId('hotkey-group')).toBeInTheDocument();
    });

    it('toggles overlay visibility when hotkey is triggered', () => {
        render(<HotkeyOverlay />);

        expect(screen.queryByRole('heading', { name: /Global/i })).not.toBeInTheDocument();

        userEvent.click(screen.getByText('Toggle Overlay'));
        expect(screen.getByRole('heading', { name: /Global/i })).toBeInTheDocument();

        userEvent.click(screen.getByText('Toggle Overlay'));
        expect(screen.queryByRole('heading', { name: /Global/i })).not.toBeInTheDocument();
    });

    it('displays hotkeys grouped by their categories', () => {
        render(<HotkeyOverlay />);

        userEvent.click(screen.getByText('Toggle Overlay'));

        expect(screen.getByRole('heading', { name: /Global/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Test Group/i })).toBeInTheDocument();

        expect(screen.getByText('Global Hotkey')).toBeInTheDocument();
        expect(screen.getByText('Test Hotkey 1')).toBeInTheDocument();
        expect(screen.getByText('Test Hotkey 2')).toBeInTheDocument();

        expect(screen.getByText('ctrl+g')).toBeInTheDocument();
        expect(screen.getByText('ctrl+1')).toBeInTheDocument();
        expect(screen.getByText('ctrl+2')).toBeInTheDocument();
    });

    it('sorts groups with Global first', () => {
        render(<HotkeyOverlay />);

        userEvent.click(screen.getByText('Toggle Overlay'));

        const headings = screen.getAllByRole('heading');
        expect(headings[0]).toHaveTextContent('Global');
        expect(headings[1]).toHaveTextContent('Test Group');
    });

    it('applies correct styles to the overlay', () => {
        render(<HotkeyOverlay />);

        userEvent.click(screen.getByText('Toggle Overlay'));

        const overlay = screen.getByTestId('hotkey-overlay');
        expect(overlay).toBeInTheDocument();
        expect(overlay).toHaveClass('root-class');

        const container = screen.getByTestId('hotkey-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('container-class');
    });

    it('renders hotkey entries with correct structure', () => {
        render(<HotkeyOverlay />);

        userEvent.click(screen.getByText('Toggle Overlay'));

        const hotkeyEntries = screen.getAllByTestId('hotkey-entry');
        expect(hotkeyEntries).toHaveLength(3);

        const firstHotkey = hotkeyEntries[0];
        expect(firstHotkey).toHaveClass('hotkey-class');

        const name = within(firstHotkey).getByTestId('hotkey-name');
        const shortcut = within(firstHotkey).getByTestId('hotkey-shortcut');
        expect(name).toBeInTheDocument();
        expect(shortcut).toBeInTheDocument();
    });
});
