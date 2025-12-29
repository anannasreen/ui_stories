import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CopyButton from './CopyButton';

// Mock the notifications store
vi.mock('../notifications/store', () => ({
    default: {
        add: vi.fn(),
        remove: vi.fn(),
        removeAll: vi.fn(),
    },
}));

describe('<CopyButton />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders', () => {
        render(
            <CopyButton copyText="text" onSuccess={vi.fn()} onFailure={vi.fn()}>
                Copy Me
            </CopyButton>,
        );

        expect(screen.getByText('Copy Me')).toBeInTheDocument();
    });

    it('copy failure', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
        const onFailure = vi.fn();

        render(
            <CopyButton copyText="text" onSuccess={vi.fn()} onFailure={onFailure} failureMessage="Nope">
                Copy Me
            </CopyButton>,
        );

        userEvent.click(screen.getByText('Copy Me'));
        expect(onFailure).toHaveBeenCalledWith('Nope');
    });
});
