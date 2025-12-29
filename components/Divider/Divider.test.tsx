import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';
import styles from './Divider.module.scss';

describe('Divider', () => {
    it('renders horizontal divider by default', () => {
        render(<Divider />);
        const divider = screen.getByRole('separator');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass(styles.divider, styles.horizontal);
    });

    it('renders vertical divider when orientation is vertical', () => {
        render(<Divider orientation="vertical" />);
        const divider = screen.getByRole('separator');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass(styles.divider, styles.vertical);
    });

    it('applies custom className when provided', () => {
        const customClass = 'custom-divider';
        render(<Divider className={customClass} />);
        const divider = screen.getByRole('separator');
        expect(divider).toHaveClass(styles.divider, customClass);
    });
});
