import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileInfo from './index';

describe('ProfileInfo', () => {
    const defaultProps = {
        name: 'Esther Howard',
        email: 'esther@cobaltai.com',
        imageSrc: 'path/to/profile-image.jpg',
    };

    it('renders name and email when showDetails is true', () => {
        render(<ProfileInfo {...defaultProps} showDetails={true} />);

        expect(screen.getByText('Esther Howard')).toBeInTheDocument();
        expect(screen.getByText('esther@cobaltai.com')).toBeInTheDocument();
    });

    it('renders only avatar when showDetails is false', () => {
        render(<ProfileInfo {...defaultProps} showDetails={false} />);

        expect(screen.queryByText('Esther Howard')).not.toBeInTheDocument();
        expect(screen.queryByText('esther@cobaltai.com')).not.toBeInTheDocument();
        expect(screen.getByAltText('profile image')).toBeInTheDocument();
    });

    it('renders name and email by default when showDetails is not provided', () => {
        render(<ProfileInfo {...defaultProps} />);

        expect(screen.getByText('Esther Howard')).toBeInTheDocument();
        expect(screen.getByText('esther@cobaltai.com')).toBeInTheDocument();
    });

    it('renders profile image correctly', () => {
        render(<ProfileInfo {...defaultProps} />);

        const img = screen.getByAltText('profile image');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', defaultProps.imageSrc);
    });
});
