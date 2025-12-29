import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TextArea from '.';

vi.mock('nanoid', () => ({
    nanoid: () => 'test-id',
}));

describe('TextArea', () => {
    it('should render basic textarea with default props', () => {
        render(<TextArea />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute('id', 'test-id');
        expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });

    it('should render label when provided', () => {
        render(<TextArea label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('should render help text when provided', () => {
        render(<TextArea helpText="Help message" />);
        expect(screen.getByText('Help message')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
        render(<TextArea error="Error message" />);
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should render learn more content when provided', () => {
        render(<TextArea learnMore={<a href="/help">Learn More</a>} />);
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should handle width prop', () => {
        const { container } = render(<TextArea width="200px" />);
        expect(container.firstChild).toHaveStyle({ width: '200px' });
    });

    it('should handle disabled state', () => {
        render(<TextArea disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should call onChange with new value and event', async () => {
        const handleChange = vi.fn();
        render(<TextArea onChange={handleChange} />);

        const textarea = screen.getByRole('textbox');
        await userEvent.type(textarea, 'new value');

        expect(handleChange).toHaveBeenCalledWith('new value', expect.any(Object));
    });

    it('should blur on Escape key', async () => {
        render(<TextArea />);
        const textarea = screen.getByRole('textbox');

        await userEvent.click(textarea);
        expect(textarea).toHaveFocus();

        await userEvent.keyboard('{Escape}');
        expect(textarea).not.toHaveFocus();
    });

    it('should forward ref to textarea element', () => {
        const ref = React.createRef<HTMLTextAreaElement>();
        render(<TextArea ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
        expect(ref.current).toBe(screen.getByRole('textbox'));
    });

    it('should apply additional HTML props to textarea element', () => {
        render(<TextArea placeholder="Enter text" maxLength={10} data-testid="custom-textarea" rows={4} />);

        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveAttribute('placeholder', 'Enter text');
        expect(textarea).toHaveAttribute('maxLength', '10');
        expect(textarea).toHaveAttribute('data-testid', 'custom-textarea');
        expect(textarea).toHaveAttribute('rows', '4');
    });

    it('should stop event propagation on Escape', async () => {
        const parentHandler = vi.fn();
        render(
            <div onKeyUp={parentHandler}>
                <TextArea />
            </div>,
        );

        const textarea = screen.getByRole('textbox');
        await userEvent.click(textarea);
        await userEvent.keyboard('{Escape}');

        expect(parentHandler).not.toHaveBeenCalled();
    });

    describe('autoSize feature', () => {
        beforeEach(() => {
            Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
                configurable: true,
                get: function () {
                    return 100;
                },
            });
        });

        afterEach(() => {
            Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
                configurable: true,
                get: function () {
                    return 0;
                },
            });
        });

        it('should adjust height when autoSize is true', async () => {
            render(<TextArea autoSize />);
            const textarea = screen.getByRole('textbox');

            await userEvent.type(textarea, 'new\nvalue\nwith\nmultiple\nlines');

            expect(textarea.style.height).toBe('103px');
        });

        it('should not adjust height when autoSize is false', async () => {
            render(<TextArea />);
            const textarea = screen.getByRole('textbox');

            await userEvent.type(textarea, 'new\nvalue\nwith\nmultiple\nlines');

            expect(textarea.style.height).toBe('');
        });

        it('should reset height before recalculating', async () => {
            render(<TextArea autoSize />);
            const textarea = screen.getByRole('textbox');

            await userEvent.type(textarea, 'first change');
            expect(textarea.style.height).toBe('103px');

            await userEvent.type(textarea, 'second change');
            expect(textarea.style.height).toBe('103px');
        });
    });
});
