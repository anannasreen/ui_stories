import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar, { variants } from './index';
import styles from './Avatar.module.scss';

describe('Avatar', () => {
    it('renders without crashing', () => {
        render(<Avatar src={'https://example.com/avatar.jpg'} username="Esther Howard" />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders with correct src attributes', () => {
        render(<Avatar src={'https://example.com/avatar.jpg'} username="Esther Howard" />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('applies the correct default CSS classes', () => {
        render(<Avatar src={'https://example.com/avatar.jpg'} username="Esther Howard" />);
        const image = screen.getByRole('img');
        expect(image).toHaveClass(variants({ size: 'xl' })); // Using variants function
    });

    it('applies the correct size class when size prop is provided', () => {
        const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

        sizes.forEach((size) => {
            const { rerender } = render(
                <Avatar src={'https://example.com/avatar.jpg'} username="Esther Howard" size={size} />,
            );
            const image = screen.getByRole('img');
            expect(image).toHaveClass(variants({ size })); // Using variants function
            rerender(<></>);
        });
    });
});
