import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Button from './Button';
import { FiPlus } from 'react-icons/fi';
import styles from './Button.module.scss';

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies default variant class', () => {
        const { container } = render(<Button>Default Button</Button>);
        expect(container.firstChild).toHaveClass(styles.button);
        expect(container.firstChild).toHaveClass(styles.primary);
    });

    it('applies custom variant classes', () => {
        const variants = ['default', 'outline', 'ghost'] as const;

        variants.forEach((variant) => {
            const { container } = render(<Button variant={variant}>Button</Button>);
            expect(container.firstChild).toHaveClass(styles[variant]);
        });
    });

    it('applies size classes correctly', () => {
        const sizes = ['medium', 'small', 'xs'] as const;

        sizes.forEach((size) => {
            const { container } = render(<Button size={size}>Button</Button>);
            expect(container.firstChild).toHaveClass(styles[size]);
        });
    });

    it('renders icon in correct position', () => {
        const icon = <FiPlus data-testid="icon" />;

        // Icon at start (default)
        const { rerender } = render(<Button icon={icon}>Button with Icon</Button>);
        const iconElements = screen.getAllByTestId('icon');
        expect(iconElements).toHaveLength(1);
        const startIconWrapper = iconElements[0].closest('span');
        expect(startIconWrapper).toHaveClass(styles.icon);
        expect(startIconWrapper?.previousSibling).toBeNull();

        // Icon at end
        rerender(
            <Button icon={icon} iconPosition="end">
                Button with Icon
            </Button>,
        );
        const endIconElements = screen.getAllByTestId('icon');
        expect(endIconElements).toHaveLength(1);
        const endIconWrapper = endIconElements[0].closest('span');
        expect(endIconWrapper).toHaveClass(styles.icon);
        expect(endIconWrapper?.nextSibling).toBeNull();
    });

    it('wraps text content in Text component with correct variant', () => {
        render(<Button>Button Text</Button>);
        const textElement = screen.getByText('Button Text');
        expect(textElement.parentElement).toHaveClass(styles.button);
    });

    it('wraps icons in Text component with correct props', () => {
        const icon = <FiPlus data-testid="icon" />;
        render(<Button icon={icon}>Button with Icon</Button>);

        const iconWrapper = screen.getByTestId('icon').closest('span');
        expect(iconWrapper).toHaveClass(styles.icon);
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Clickable Button</Button>);

        await userEvent.click(screen.getByText('Clickable Button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles disabled state', async () => {
        const handleClick = vi.fn();
        render(
            <Button disabled onClick={handleClick}>
                Disabled Button
            </Button>,
        );

        const button = screen.getByRole('button', { name: 'Disabled Button' });
        expect(button).toBeDisabled();

        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies custom className alongside default classes', () => {
        const { container } = render(<Button className="custom-class">Custom Button</Button>);
        expect(container.firstChild).toHaveClass(styles.button);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('spreads additional props to button element', () => {
        render(
            <Button data-testid="test-button" aria-label="Test Button">
                Button
            </Button>,
        );
        const button = screen.getByTestId('test-button');
        expect(button).toHaveAttribute('aria-label', 'Test Button');
    });

    it('renders as a link when href is provided', () => {
        render(<Button href="https://example.com">Link Button</Button>);
        const link = screen.getByRole('link', { name: 'Link Button' });
        expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('applies button styles to link element', () => {
        const { container } = render(
            <Button href="https://example.com" color="primary">
                Styled Link
            </Button>,
        );
        expect(container.firstChild).toHaveClass(styles.button);
        expect(container.firstChild).toHaveClass(styles.primary);
    });

    it('supports target and rel attributes for links', () => {
        render(
            <Button href="https://example.com" target="_blank" rel="noopener noreferrer">
                External Link
            </Button>,
        );
        const link = screen.getByRole('link', { name: 'External Link' });
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders icons correctly in link mode', () => {
        const icon = <FiPlus data-testid="icon" />;
        render(
            <Button href="https://example.com" icon={icon}>
                Link with Icon
            </Button>,
        );

        const iconElement = screen.getByTestId('icon');
        expect(iconElement).toBeInTheDocument();
        const iconWrapper = iconElement.closest('span');
        expect(iconWrapper).toHaveClass(styles.icon);
    });

    it('applies fullscreen class when fullscreen prop is true', () => {
        const { container: containerWithFullscreen } = render(<Button fullscreen>Fullscreen Button</Button>);
        expect(containerWithFullscreen.firstChild).toHaveClass(styles.fullscreen);

        const { container: containerWithoutFullscreen } = render(<Button>Regular Button</Button>);
        expect(containerWithoutFullscreen.firstChild).not.toHaveClass(styles.fullscreen);
    });
});
